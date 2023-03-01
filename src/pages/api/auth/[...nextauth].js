import db from '@/utilities/db'
import bcryptjs from 'bcryptjs'
import User from 'models/User'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({token, user}){
            if(user?._id) token._id = user._id
            if(user?.isAdmin) token.isAdmin = user.isAdmin
            return token
        },
        async session({session, token}){
            if(token?._id) session._id = token._id
            if(token?.isAdmin) session.isAdmin = token.isAdmin
            return session
        }
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials){
                db.connect();
                const user = User.findOne({
                    email: credentials.email
                })
                await db.disconnect()
                if(user && bcryptjs.compareSync(credentials.password, user.password)){
                    return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        image: "f",
                        isAdmin: user.isAdmin,
                    }
                }
                throw new Error("Invalid email and password")
            }
        })
    ]
})