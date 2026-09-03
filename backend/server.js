require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => {});
  } catch (error) {
    app.listen(PORT, () => {});
  }
};

startServer();