const { Product } = require("../models");
const productResource = ["id", "name", "description"];
const productResourceJson = (product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
  };
};

async function index(req, res) {
  const id = req.query.id;
  if (id != null) {
    Product.findOne({
      where: { id: id },
      attributes: ["id", "name", "description"],
    })
      .then((product) => {
        res.send(product);
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    await Product.findAll({
      attributes: productResource, //if you wan to show just a spesific data
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

async function store(req, res) {
  const data = {
    name: req.body.name,
    description: req.body.description,
  };

  Product.create(data)
    .then((product) => {
      res.status(200).json(productResourceJson(product));
    })
    .catch((error) => {
      res.send(error.errors[0]);
    });
}

async function update(req, res) {
  const id = req.params.id;
  const data = {
    name: req.body.name,
    description: req.body.description,
  };

  await Product.update(data, {
    where: {
      id: id,
    },
  })
    .then(() => {
      Product.findOne({
        where: { id: id },
        attributes: ["id", "name", "description"],
      }).then((product) => {
        res.send(product);
      });
    })
    .catch((error) => {
      res.send(error.errors[0]);
    });
}

async function destroy(req, res) {
  const id = req.params.id;
  await Product.destroy({
    where: { id: id }
  }).then(() =>{
    res.send({
      status: 200,
      message: "Product has been deleted."
    })
  }).catch((error)=>{
    res.send(error.errors[0])
  })
}

module.exports = {
  index,
  store,
  update,
  destroy,
};
