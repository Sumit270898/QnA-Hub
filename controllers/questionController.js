const Question = require('../models/Question');
const Category = require('../models/Category');
const csvParser = require('csv-parser');
const fs = require('fs');

class QuestionController {
  async addQuestionsInBulk(req, res) {
    try {
      const questions = [];
      fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (row) => {
          questions.push({
            text: row.text,
            options: row.options.split('|'),
            correctAnswer: row.correctAnswer,
            categories: row.categories.split(','),
          });
        })
        .on('end', async () => {
          for (const question of questions) {
            const categoryIds = await Category.find({ name: { $in: question.categories } }).select('_id');
            question.categories = categoryIds.map((cat) => cat._id);
            await Question.create(question);
          }

          res.send({ message: 'Questions added successfully' });
        });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async getQuestionsByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const questions = await Question.find({ categories: categoryId });
      res.send(questions);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async searchQuestions(req, res) {
    try {
      const { searchText } = req.body;
      const questions = await Question.find({
        text: { $regex: searchText, $options: 'i' },
      });
      res.send(questions);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async createQuestion(req, res) {
    try {
      const { text, options, correctAnswer, categories } = req.body;
      const categoryIds = await Category.find({ name: { $in: categories } }).select('_id');
      const question = new Question({
        text,
        options,
        correctAnswer,
        categories: categoryIds.map((cat) => cat._id),
      });

      await question.save();
      res.status(201).send({ message: 'Question created successfully', question });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}

module.exports = new QuestionController();
