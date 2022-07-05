import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import OrderItem from '../../../models/OrderItem';
import Product from '../../../models/Product';
import User from '../../../models/User';
import { getError } from '../../../utils/error';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('Giriş yapınız.')
    }

    Order.belongsTo(User)
    User.hasMany(Order);

    Order.belongsToMany(Product, { through: OrderItem })
    Product.belongsToMany(Order, { through: OrderItem })

    const user = await User.findByPk(session.user.id);
    user.getOrders({ include: ['products', 'user'], where: { id: req.query.id } }).then(order => {
        res.status(200).send(order[0]);
    }).catch(err => { return res.status(500).send(getError(err)); })
}

export default handler;