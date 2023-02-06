"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "category_id", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "categories",
        },
        key: "id",
      },
      after: "description",
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    //
  },
};
