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
      clientId: '138828050871-vpnp5m9bp41hi080k60tlr65sadep8tp.apps.googleusercontent.com',
      clientSecret: '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'
    }),
  ]
}

export default(NextAuth(authOptions))