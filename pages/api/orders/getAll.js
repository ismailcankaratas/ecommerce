import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import { getError } from '../../../utils/error';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('Giriş yapınız.')
    }
    if (!session.user.isAdmin) {
        return res.status(401).send('Yetkiniz yok.')
    }

    Order.findAll({ include: ['products', 'user'] }).then((orders) => {
        return res.status(200).send(orders);
    }).catch((err) => {
        return res.status(500).send(getError(err));
    });

}

export default handler;