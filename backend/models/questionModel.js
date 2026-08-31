const questions = require("../data/questions.json");

const getQuestionsByCategory = (category) => {
  return questions.filter(
    (question) => question.category === category
  );
};

module.exports = {getQuestionsByCategory,};