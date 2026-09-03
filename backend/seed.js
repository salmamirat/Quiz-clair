const sequelize = require("./config/database");
const Question = require("./models/Question");
const questions = require("./data/questions");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await Question.bulkCreate(questions);

    console.log("Questions ajoutées avec succès !");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedDatabase();