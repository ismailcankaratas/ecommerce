import User from "../../../models/User";
import { getError } from "../../../utils/error";
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('Giriş yapınız.')
    }
    if (!session.user.isAdmin) {
        return res.status(401).send('Yetkiniz yok.')
    }

    User.findAll().then((users) => {
        return res.status(200).send(users)
    }).catch((err) => {
        return res.status(400).send(getError(err))
    });
}

export default handler;