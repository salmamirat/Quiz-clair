const getQuestions = (req, res) => {
  res.json({
    message: "Liste des questions",
  });
};

const getQuestionById = (req, res) => {
  const id = req.params.id;

  res.json({
    message: `Question numéro ${id}`,
  });
};

const createQuestion = (req, res) => {
  const question = req.body;

  res.status(201).json({
    message: "Question créée",
    data: question,
  });
};

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
};