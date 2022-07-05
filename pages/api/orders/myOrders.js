import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import OrderItem from '../../../models/OrderItem';
import Product from '../../../models/Product';
import User from '../../../models/User';
import { getError } from '../../../utils/error';

const handler = async (req, res) => {
    const session = await getSession({ req })

    if (!session) {
        return res.status(401).send('Giriş yapınız.');
    }

    const user = await User.findByPk(session.user.id)
    user.getOrders({ include: ['products'] }).then((orders) => {
        return res.status(200).send(orders)
    }).catch((err) => {
        return res.status(500).send({ message: getError(err) })
    });
}
export default handler;