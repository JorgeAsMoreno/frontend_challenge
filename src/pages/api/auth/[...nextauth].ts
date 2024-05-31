import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_SECRET as string,
    }),
  ]
}

export default(NextAuth(authOptions))