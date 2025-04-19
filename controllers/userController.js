const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

class UserController {
  async signup(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = new User({ name, email, password });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Verify your account',
        text: `Click here to verify: ${process.env.BASE_URL}/verify/${token}`,
      });

      res.status(201).send({ message: 'User registered. Please verify your email.' });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.send({ token });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      res.send(user);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const updates = req.body;
      if (req.file) updates.profilePicture = req.file.path;
      const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
      res.send(user);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async verifyProfile(req, res) {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      if (user.verified) {
        return res.status(400).send({ message: 'User is already verified' });
      }

      user.verified = true;
      await user.save();

      res.send({ message: 'User verified successfully' });
    } catch (err) {
      res.status(400).send({ error: 'Invalid or expired token' });
    }
  }
}

module.exports = new UserController();
