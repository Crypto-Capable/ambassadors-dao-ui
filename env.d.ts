declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_VERCEL_URL: string;
      NEXT_PUBLIC_CONTRACT_NAME: string;
      NEXT_PUBLIC_NODE_URL: string;
      NEXT_PUBLIC_WALLET_URL: string;
      NEXT_PUBLIC_HELPER_URL: string;
      NEXT_PUBLIC_SENTRY_DSN: string;

      NEARAMP_PRIVATE_KEY: string;
      SENTRY_DSN: string;
      SENTRY_AUTH_TOKEN: string;
      SENTRY_ORG_SLUG: string;
      SENTRY_PROJECT_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
