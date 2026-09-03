const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Question = sequelize.define("Question", {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  options: {
    type: DataTypes.JSON,
    allowNull: false,
  },

  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Question;




