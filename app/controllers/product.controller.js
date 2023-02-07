const { Product, Category } = require("../models");
async function index(req, res) {
  const id = req.query.id;
  if (id != null) {
    await Product.findOne({
      where: { id: id },
      // attributes: ["id", "name", "description"],
      include: ["category"],
    })
      .then((product) => {
        res.send({
          id: product.id,
          name: product.name,
          description: product.description,
          category: product.category,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    await Product.findAll({
      order: [["name", "desc"]],
      include: ["category"],
    })
      .then((product) => {
        res.send(
          product.map((value) => {
            return {
              id: value.id,
              name: value.name,
              description: value.description,
              category: value.category,
              createdAt: value.createdAt,
              updatedAt: value.updatedAt,
            };
          })
        );
      })
      .catch((error) => {
        res.send(error);
      });
  }
}

async function store(req, res) {
  const data = {
    name: req.body.name,
    category_id: req.body.category_id,
    description: req.body.description,
  };

  Product.create(data)
    .then((product) => {
      res.send({
        status: 200,
        message: "Product has been created.",
        data: product,
      });
    })
    .catch((error) => {
      res.send(error.errors[0]);
    });
}

async function update(req, res) {
  const id = req.params.id;
  const data = {
    name: req.body.name,
    category_id: req.body.category_id,
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
      }).then((product) => {
        res.send({
          status: 200,
          message: "Product has been updated.",
          data: product,
        });
      });
    })
    .catch((error) => {
      res.send(error.errors[0]);
    });
}

async function destroy(req, res) {
  const id = req.params.id;
  await Product.destroy({
    where: { id: id },
  })
    .then(() => {
      res.send({
        status: 200,
        message: "Product has been deleted.",
      });
    })
    .catch((error) => {
      res.send(error.errors[0]);
    });
}

module.exports = {
  index,
  store,
  update,
  destroy,
};
