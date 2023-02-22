const { Product } = require("../models");
const fs = require("fs");

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
          image: product.image,
          category: product.category,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } else if (!req.query.id) {
    await Product.findAll({
      order: [["id", "desc"]],
      include: ["category"],
    })
      .then((products) => {
        res.send(
          products.map((product) => {
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              image: product.image,
              category: product.category,
              createdAt: product.createdAt,
              updatedAt: product.updatedAt,
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
    image: req.file.path,
  };

  Product.create(data)
    .then((product) => {
      Product.findByPk(product.id, { include: ["category"] }).then(
        (product) => {
          res.send({
            status: 200,
            message: "Product has been created.",
            data: {
              id: product.id,
              name: product.name,
              description: product.description,
              image: product.image,
              category: product.category,
              createdAt: product.createdAt,
              updatedAt: product.updatedAt,
            },
          });
        }
      );
    })
    .catch((error) => {
      res.send(error.errors);
    });
}

async function update(req, res) {
  const id = req.params.id;
  const oldProduct = await Product.findByPk(id).catch((error) => {
    res.send(error);
  });
  const data = {
    name: req.body.name,
    category_id: req.body.category_id,
    description: req.body.description,
    image: req.file.path,
  };
  console.log(data);

  await Product.update(data, {
    where: {
      id: id,
    },
  })
    .then(() => {
      if (oldProduct.image != null) {
        fs.unlinkSync(oldProduct.image);
      }

      Product.findOne({
        where: { id: id },
        include: ["category"],
      }).then((product) => {
        res.send({
          status: 200,
          message: "Product has been updated.",
          data: {
            id: product.id,
            name: product.name,
            description: product.description,
            image: product.image,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
          },
        });
      });
    })
    .catch((error) => {
      res.send(error.errors);
    });
}

async function destroy(req, res) {
  const id = req.params.id;
  const product = await Product.findByPk(id).catch((error) => {
    res.send(error);
  });

  // For delete and old image
  fs.unlinkSync(product.image);

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
