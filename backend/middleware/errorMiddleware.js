const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);

  res.status(500).json({
    message: "Une erreur est survenue",
  });
};

module.exports = errorMiddleware;