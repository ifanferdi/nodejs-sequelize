const { Product } = require("../models");

async function index(req, res, next) {
  const id = req.query.id;
  const attributeResource = ["id", "name", "description"];
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
      // attributes: attributeResource, //if you wan to show just a spesific data
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

async function store(req, res, next) {
  const data = {
    name: req.body.name,
    description: req.body.description,
  };

  Product.create(data)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.send(error.errors[0]);
    });
}

module.exports = {
  index,
  store,
};
