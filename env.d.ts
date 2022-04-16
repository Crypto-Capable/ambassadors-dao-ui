declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // final protocol:hostname to be used in a deployment
      // is set in next.config.js using some logic
      // for a local dev environment it is set right from the .env.development.local file
      NEXT_PUBLIC_HOST: string;
      NEXT_PUBLIC_CONTRACT_NAME: string;
      NEXT_PUBLIC_NODE_URL: string;
      NEXT_PUBLIC_WALLET_URL: string;
      NEXT_PUBLIC_HELPER_URL: string;
      NEXT_PUBLIC_SENTRY_DSN: string;
      // vercel's systems reserved env variable
      NEXT_PUBLIC_VERCEL_ENV: 'production' | 'preview' | 'development';

      // the domain where the website is hosted
      HOST: string;
      // RSA private key for signing JWTs for nearamp
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
