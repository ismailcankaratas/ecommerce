import { useSession } from 'next-auth/react';
import Order from '../../../models/Order';
import { getError } from '../../../utils/error';

const handler = (req, res) => {
    const { status, data: session } = useSession();
    if (!session.user) {
        return res.status(401).send({ message: "Lütfen giriş yapınız." })
    }
    if (!session.user.isAdmin) {
        return res.status(401).send({ message: "Yetkiniz yok." })
    }

    Order.update(req.body, { where: { id: req.body.id } }).then((result) => {
        return res.status(201).send({ message: "Ürün başarıyla güncellendi." })
    }).catch((err) => {
        console.log(err)
        return res.status(201).send({ message: getError(err) });
    })
}

export default handler;