"use strict";
const ProductFaker = require("../factory/product-faker.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log(ProductFaker(10));
    return queryInterface.bulkInsert("Products", ProductFaker(10));
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("Products", null, {});
  },
};
