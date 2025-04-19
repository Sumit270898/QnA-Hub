const Answer = require('../models/Answer');
const Question = require('../models/Question');

class AnswerController {
  async submitAnswer(req, res) {
    try {
      const { questionId, selectedOption } = req.body;
      const answer = new Answer({
        user: req.user.id,
        question: questionId,
        selectedOption,
      });
      await answer.save();
      res.status(201).send({ message: 'Answer submitted successfully' });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  async searchQuestionsWithAnswers(req, res) {
    try {
      const { searchText, timezone } = req.body;
      const answers = await Answer.aggregate([
        {
          $lookup: {
            from: 'questions',
            localField: 'question',
            foreignField: '_id',
            as: 'questionDetails',
          },
        },
        { $unwind: '$questionDetails' },
        {
          $match: {
            'questionDetails.text': { $regex: searchText, $options: 'i' },
            user: req.user._id,
          },
        },
        {
          $project: {
            questionText: '$questionDetails.text',
            selectedOption: 1,
            submittedAt: {
              $dateToString: { format: '%Y-%m-%d %H:%M:%S', date: '$submittedAt', timezone },
            },
          },
        },
      ]);
      res.send(answers);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}

module.exports = new AnswerController();
