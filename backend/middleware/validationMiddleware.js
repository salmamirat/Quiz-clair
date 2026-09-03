const validateQuestion = (req, res, next) => {
  const { category, question, options, correctAnswer,} = req.body;

  if (
    !category ||
    !question ||
    !options ||
    !correctAnswer
  ) {
    return res.status(400).json({
      message: "Tous les champs sont obligatoires",
    });
  }

  next();
};

module.exports = validateQuestion;