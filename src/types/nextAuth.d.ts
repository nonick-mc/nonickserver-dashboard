import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: 'invalid_token';
    user?: {
      id?: string;
    } & DefaultSession['user'];
  }

  interface Profile {
    id?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    accessToken?: string;
    accessTokenExpires?: number;
    error?: 'invalid_token';
  }
}
