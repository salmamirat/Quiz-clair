const express = require("express");
const cors = require("cors");

const questionsRoutes = require("./routes/questions");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/questions", questionsRoutes);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});