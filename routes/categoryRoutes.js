const express = require('express');
const CategoryController = require('../controllers/categoryController');

const router = express.Router();

// Route to get all categories with question counts
router.get('/', CategoryController.getAllCategories.bind(CategoryController));

// Route to get all categories along with total question count
router.get('/with-question-count', CategoryController.getAllCategoriesWithQuestionCount.bind(CategoryController));

// Route to create a single category
router.post('/', CategoryController.createCategory.bind(CategoryController));

module.exports = router;
