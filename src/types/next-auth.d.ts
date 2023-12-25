// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: 'invalid_token';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
    error?: 'invalid_token';
  }
}
