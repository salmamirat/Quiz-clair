const express = require("express");
const cors = require("cors");

const questionRoutes = require("./routes/questionRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/questions", questionRoutes);

module.exports = app;