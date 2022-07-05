import Sequelize from "sequelize";
import sequelize from "../utils/db";

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    }
}, {
    timestamps: true
});



export default User;