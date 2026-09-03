require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT} (Database connection failed)`);
    });
  }
};

startServer();