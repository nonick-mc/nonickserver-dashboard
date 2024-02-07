import nextAuth, { AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const authOption: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: process.env.DISCORD_SCOPE } },
    }),
  ],
  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at;
      }

      if (user) {
        token.id = user.id;
      }

      if (
        token.accessTokenExpires &&
        Date.now() > token.accessTokenExpires * 1000
      ) {
        token.error = 'invalid_token';
      }

      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        error: token.error,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
};

const handler = nextAuth(authOption);

export { handler as GET, handler as POST };
