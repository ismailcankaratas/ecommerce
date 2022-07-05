import Sequelize from "sequelize";
import sequelize from "../utils/db";

const PorductImages = sequelize.define('PorductImages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    imageOne: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageTwo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    imageThree: {
        type: Sequelize.STRING,
        allowNull: true
    },
    imageFour: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, { timestamps: false });

export default PorductImages;