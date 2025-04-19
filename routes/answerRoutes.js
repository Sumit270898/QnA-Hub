const express = require('express');
const AnswerController = require('../controllers/AnswerController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to submit an answer
router.post('/submit', authMiddleware, AnswerController.submitAnswer.bind(AnswerController));

// Route to search questions with answers
router.post('/search', authMiddleware, AnswerController.searchQuestionsWithAnswers.bind(AnswerController));

module.exports = router;
