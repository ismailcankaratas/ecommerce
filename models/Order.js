import Sequelize from "sequelize";
import sequelize from "../utils/db";
import OrderItem from "./OrderItem";
import Product from "./Product";
import User from "./User";

const Order = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    fullName: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: false },
    city: { type: Sequelize.STRING, allowNull: false },
    postalCode: { type: Sequelize.STRING, allowNull: false },
    country: { type: Sequelize.STRING, allowNull: false },
    phoneNumber: { type: Sequelize.STRING, allowNull: false },

    // CountQueuingStrategy: { type: Sequelize.STRING, allowNull: false },

    paymentMethod: { type: Sequelize.STRING, allowNull: false },
    itemsPrice: { type: Sequelize.INTEGER, allowNull: false },
    shippingPrice: { type: Sequelize.INTEGER, allowNull: false },
    taxPrice: { type: Sequelize.INTEGER, allowNull: false },
    totalPrice: { type: Sequelize.INTEGER, allowNull: false },

    isPaid: { type: Sequelize.BOOLEAN, allowNull: true, default: false },
    isDelivered: { type: Sequelize.BOOLEAN, allowNull: true, default: false },
    paidAt: { type: Sequelize.DATE, allowNull: true },
    deliveredAt: { type: Sequelize.DATE, allowNull: true },
}, {
    timestamps: true
});

Order.belongsTo(User)
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem })
Product.belongsToMany(Order, { through: OrderItem })

export default Order;