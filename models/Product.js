import Sequelize from "sequelize";
import sequelize from "../utils/db";

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },

    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        default: 0
    },
    numReviews: {
        type: Sequelize.INTEGER,
        default: 0
    },
    countInStock: {
        type: Sequelize.INTEGER,
        default: 0
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

export default Product;