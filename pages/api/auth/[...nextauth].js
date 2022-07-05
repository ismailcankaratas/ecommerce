import NextAuth from "next-auth";
import User from "../../../models/User";
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.id) token.id = user.id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin;
            return token;
        },
        async session({ session, token }) {
            if (token?.id) session.user.id = token.id;
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            async authorize(credentiails) {
                const user = await User.findOne({ where: { email: credentiails.email } });

                const validPassword = bcrypt.compareSync(credentiails.password, credentiails.password);

                if (user && bcrypt.compareSync(credentiails.password, user.password)) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: 'f',
                        isAdmin: user.isAdmin
                    };
                }
                throw new Error('Invalid email or password');
            }
        }),
    ]
})