import { getSession } from 'next-auth/react';
import Site from '../../../models/Site';
import { getError } from '../../../utils/error';

const handler = async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
        return res.status(201).send({ message: "Lütfen giriş yapınız." });
    }
    if (!session.user.isAdmin) {
        return res.status(201).send({ message: "Bu işlemi yapmak için yetkiniz yok." })
    }
    if (req.method != 'POST') {
        return res.status(500).send({ message: "Post methodunu kullanın!" })
    }

    const site = Site.findAll({ where: { id: 1 } });

    if (site) {
        console.log(req.method);
        Site.update(req.body, { where: { id: 1 } }).then((result) => {
            return res.status(200).send({ message: "Site bilgileri başarıyla güncellendi." })
        }).catch((err) => {
            return res.status(500).send({ message: getError(err) })
        });
    } else {
        return res.status(500).send({ message: "Database hatası: VERİ YOK" })
    }

}

export default handler;