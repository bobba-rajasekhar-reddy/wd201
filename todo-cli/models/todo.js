/* eslint-disable semi */
/* eslint-disable quotes */
"use strict";
const { Op } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      
      const overdueTasks = await this.overdue();
      const overdueResultsArray = [];

      overdueTasks.forEach((task) => {
        overdueResultsArray.push(task.displayableString());
      });

      const overdueResults = overdueResultsArray.join("\n");
      console.log(overdueResults);

      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      
      const todayTasks = await this.overdue();
      const todayResultsArray = [];

      for (const task of todayTasks) {
        todayResultsArray.push(task.displayableString());
      }

      const todayResults = todayResultsArray.join("\n");
      console.log(todayResults);

      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      
      const laterTasks = await this.overdue();
      const laterResultsArray = [];

      laterTasks.forEach((task) => {
        laterResultsArray.push(task.displayableString());
      });

      const laterResults = laterResultsArray.join("\n");
      console.log(laterResults);
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      
      const overdueTasks = await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
      });
      
      return overdueTasks;
      
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const dueTodayResults = await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
        },
      });

      return dueTodayResults;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const dueLaterResults = await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
        },
      });

      return dueLaterResults;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update(
        { completed: true },
        {
          where: {
            id,
          },
        }
      );
    }

    displayableString() {
      const checkbox = this.completed ? "[x]" : "[ ]";
      const formattedDueDate = new Date(this.dueDate)
        .toISOString()
        .split("T")[0];

      switch (formattedDueDate) {
        case new Date().toISOString().split("T")[0]:
          return `${this.id}. ${checkbox} ${this.title}`;
        default:
          return `${this.id}. ${checkbox} ${this.title} ${formattedDueDate}`;
      }
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
