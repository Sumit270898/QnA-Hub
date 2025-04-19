const express = require('express');
const QuestionController = require('../controllers/questionController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Route to add questions in bulk
router.post('/bulk', upload.single('file'), QuestionController.addQuestionsInBulk.bind(QuestionController));

// Route to get questions by category
router.get('/category/:categoryId', QuestionController.getQuestionsByCategory.bind(QuestionController));

// Route to search questions
router.post('/search', QuestionController.searchQuestions.bind(QuestionController));

// Route to create a single question
router.post('/', QuestionController.createQuestion.bind(QuestionController));

module.exports = router;
