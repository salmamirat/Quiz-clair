const express = require("express");
const { getQuestionsByCategory,  getAllQuestions,} = require("../controllers/questionController");

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/category/:category", getQuestionsByCategory);

module.exports = router;
