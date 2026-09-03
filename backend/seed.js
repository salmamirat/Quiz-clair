const sequelize = require("./config/database");
const Category = require("./models/Category");
const Question = require("./models/Question");
const categories = require("./data/categoriesData");
const questions = require("./data/questionsData");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    await Category.bulkCreate(categories);
    await Question.bulkCreate(questions);
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

seedDatabase();