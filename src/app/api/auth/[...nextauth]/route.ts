import nextAuth, { AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

const authOption: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: process.env.DISCORD_SCOPE } },
    }),
  ],
  callbacks: {
    async jwt({ account, token }) {
      if (account) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at;
      }

      if (
        token.accessTokenExpires &&
        Date.now() > token.accessTokenExpires * 1000
      ) {
        token.error = 'invalid_token';
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};

const handler = nextAuth(authOption);

export { handler as GET, handler as POST };
