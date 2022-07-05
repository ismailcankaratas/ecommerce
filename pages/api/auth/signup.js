import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { getError } from '../../../utils/error';

async function handler(req, res) {
    if (req.method !== 'POST') { return; }
    const { name, email, password } = req.body;
    if (!name || !email || !email.includes('@') || !password || password.trim().length < 3) {
        res.status(422).json({
            message: 'Validation error'
        });
        return;
    }

    const existingUser = await User.findAll({ where: { email: email } });
    if (existingUser[0]) {
        res.status(422).json({
            message: 'User exists already!'
        });
        return;
    }

    const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password),
        isAdmin: false
    })
    res.status(201).send({
        message: 'Created user!',
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
}

export default handler;