const sequelize = require("./config/database");
const Category = require("./models/Category");
const Question = require("./models/Question");

//kijib qst w y3mer postgreSql f de99a wehda bla mndkhel qst b yedi 
const categories = require("./data/categoriesData");
const questions = require("./data/questionsData");

const seedDatabase = async () => {
  try {

    //kikhwi w ki9ad tables f postgreSql
    await sequelize.sync({ force: true });

    //kilo7 qst f base de données
    await Category.bulkCreate(categories);
    await Question.bulkCreate(questions);

    console.log("Database seeded successfully!");
    //kisali lkhedma dyelo 
    process.exit(0);

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();