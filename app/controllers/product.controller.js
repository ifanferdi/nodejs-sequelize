const { Product } = require("../models");

async function index(req, res, next) {
  const id = req.params.id;
  const attributes = ["id", "name", "description"];
  if (id != null) {
    await Product.findByPk(id)
      .then((product) => {
        res.send(product);
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    await Product.findAll({
      // attributes: attributes, //if you wan to show just a spesific data
      order: [["name", "desc"]],
    })
      .then((product) => {
        res.send(product);
      })
      .catch((error) => {
        res.send(error);
      });
  }
}

async function store(req, res, next) {}

module.exports = {
  index,
};
