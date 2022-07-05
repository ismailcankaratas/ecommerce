import { Sequelize } from "sequelize";
import sequelize from "../utils/db";

const Site = sequelize.define('Site', {
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
    slogan: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    postalCode: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
});

export default Site;