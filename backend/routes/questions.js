const express = require("express");
const { getQuestions, getQuestionById, createQuestion,} = require("../controllers/questionController");

const router = express.Router();

router.get("/", getQuestions);

router.get("/:id", getQuestionById);

router.post("/", createQuestion);

module.exports = router;