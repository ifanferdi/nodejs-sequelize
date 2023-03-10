const faker = require("@faker-js/faker/locale/id_ID");

function ProductFaker(n) {
  const product = () => {
    return {
      name: faker.faker.name.fullName(),
      description: faker.faker.lorem.words(),
      category_id: Math.floor(Math.random() * 3) + 1,
    };
  };

  const createProducts = (amount = n) => {
    return Array.from({ length: amount }, product);
  };

  return createProducts(n);
}

module.exports = ProductFaker;
