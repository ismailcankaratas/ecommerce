import { getSession } from 'next-auth/react';
import Site from '../../../models/Site';
import { getError } from '../../../utils/error';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({ message: 'Giriş yapınız.' })
    }

    Site.findAll({ where: { id: 1 } }).then((settings) => {
        return res.status(200).send(settings[0]);
    }).catch((err) => {
        return res.status(500).send({ message: getError(err) });
    });
}

export default handler;