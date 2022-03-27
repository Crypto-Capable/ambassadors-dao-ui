declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_HOST: string;
      NEXT_PUBLIC_CONTRACT_NAME: string;
      NEXT_PUBLIC_NODE_URL: string;
      NEXT_PUBLIC_WALLET_URL: string;
      NEXT_PUBLIC_HELPER_URL: string;

      NEARAMP_PRIVATE_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
