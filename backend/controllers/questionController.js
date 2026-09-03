const Question = require("../models/Question");

const getQuestionsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const questions = await Question.findAll({
      where: { category },
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuestionsByCategory,
  getAllQuestions,
};
