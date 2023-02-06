const faker = require("@faker-js/faker/locale/id_ID");

function CategoryFaker(n) {
  const category = () => {
    return {
      name: faker.faker.lorem.word(),
    };
  };

  const createCategories = (amount = n) => {
    return Array.from({ length: amount }, category);
  };

  return createCategories(n);
}

module.exports = CategoryFaker;
