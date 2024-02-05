declare namespace NodeJS {
  interface ProcessEnv {
    readonly DISCORD_CLIENT_ID: string;
    readonly DISCORD_CLIENT_SECRET: string;
    readonly DISCORD_SCOPE: string;

    readonly NEXTAUTH_URL: string;
    readonly NEXTAUTH_SECRET: string;
  }
}