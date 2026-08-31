const questionModel = require("../models/questionModel");

const getQuestions = (req, res) => {
  const { category } = req.params;

  const questions = questionModel.getQuestionsByCategory(category);

  res.json(questions);
};

module.exports = {
  getQuestions,
};