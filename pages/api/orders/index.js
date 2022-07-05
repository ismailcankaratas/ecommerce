
import { getSession } from 'next-auth/react';
import User from '../../../models/User';
import Product from '../../../models/Product';
import Order from '../../../models/Order';
import OrderItem from '../../../models/OrderItem';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('Giriş yapınız.')
    }
    const { user } = session;

    Order.belongsTo(User)
    User.hasMany(Order);

    Order.belongsToMany(Product, { through: OrderItem })
    Product.belongsToMany(Order, { through: OrderItem })

    const orderItems = [];

    req.body.orderItems.map(product => {
        Product.findByPk(product.id).then(item => {
            item.orderItem = {
                name: product.name,
                quantity: product.quantity,
                image: product.image,
                price: product.price
            }
            orderItems.push(item);
        })
    })

    User.findByPk(user.id).then((user) => {
        return user.createOrder({
            fullName: req.body.shippingAddress.fullName,
            address: req.body.shippingAddress.address,
            city: req.body.shippingAddress.city,
            postalCode: req.body.shippingAddress.postalCode,
            country: req.body.shippingAddress.country,
            phoneNumber: req.body.shippingAddress.phoneNumber,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
        }).then((order) => {
            order.addProducts(orderItems).then((result) => {
                return res.status(200).send(result[0]);
            }).catch((err) => { console.log(err); });
        }).catch((err) => { console.log(err); });
    }).catch((err) => { console.log(err); });

}

export default handler