const Category = require('../models/Category');
const Question = require('../models/Question');

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await Category.aggregate([
        {
          $lookup: {
            from: 'questions',
            localField: '_id',
            foreignField: 'categories',
            as: 'questions',
          },
        },
        {
          $project: {
            name: 1,
            questionCount: { $size: '$questions' },
          },
        },
      ]);
      res.send(categories);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async createCategory(req, res) {
    try {
      const { name } = req.body;
      const category = new Category({ name });
      await category.save();
      res.status(201).send({ message: 'Category created successfully', category });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}

module.exports = new CategoryController();
