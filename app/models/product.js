"use strict";
const { Model, Sequelize } = require("sequelize");
const Category = require("./category");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [1, 255],
        },
      },
      description: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Category",
          key: "id",
        },
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [1, 255],
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: true,
    }
  );
  return Product;
};
