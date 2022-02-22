declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_HOST: string;
      NEXT_PUBLIC_CONTRACT_NAME: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
