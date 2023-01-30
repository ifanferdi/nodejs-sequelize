const Product = require("../app/models").Product;

async function index(req, res, next) {
  res.send(
    await Product.findAll({
      order: [["name", "desc"]],
    })
  );
}

module.exports = {
  index,
};
