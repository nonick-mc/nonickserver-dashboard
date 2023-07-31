import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const authOption: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: process.env.DISCORD_CLIENT_SCOPE } },
    }), 
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      return session;
    },
    jwt: async ({ token, account }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };