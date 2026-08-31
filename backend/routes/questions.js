const express = require("express");
const router = express.Router();

const { getQuestions,} = require("../controllers/questionsController");

router.get("/:category", getQuestions);

module.exports = router;