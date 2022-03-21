import { createContext, useContext, useEffect, useState } from 'react';
import { keyStores, connect, WalletConnection } from 'near-api-js';

const config = {
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org/',
  helperUrl: 'https://helper.testnet.near.org/',
};

type AuthContextType = {
  signIn: () => void;
  signOut: () => void;
  wallet: WalletConnection | null;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: () => Promise.resolve(),
  signOut: () => {},
  wallet: null,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);

  const value: AuthContextType = {
    signIn: async () => {
      try {
        // make sure wallet connection has been established
        wallet!.requestSignIn(
          process.env.NEXT_PUBLIC_CONTRACT_NAME,
          'Crypto Capable Ambassadors DAO',
          `${process.env.NEXT_PUBLIC_HOST}/register/success`,
          `${process.env.NEXT_PUBLIC_HOST}/register/failure`
        );
        // router.push('/dashboard');
      } catch (error) {
        console.log(error);
      }
    },
    signOut: () => {
      // make sure wallet connection has been established
      wallet!.signOut();
      setWallet(null);
      window.location.replace('/');
    },
    wallet,
  };

  useEffect(() => {
    console.log(
      '%cWelcome to Campus Ambassadors DAO from Crypto Capable',
      'font-size:1rem;color:violet;font-weight:bold;font-family:sans-serif;'
    );
    console.log(
      'Please do not use the javascript console as it may lead to loss of data.'
    );

    const loadNearWallet = async () => {
      // create a keyStore for signing transactions using the user's key
      // which is located in the browser local storage after user logs in
      const keyStore = new keyStores.BrowserLocalStorageKeyStore(localStorage);

      // Initializing connection to the NEAR testnet
      const near = await connect({
        keyStore,
        networkId: 'testnet',
        headers: {},
        ...config,
      });

      // Initialize wallet connection
      const walletConnection = new WalletConnection(near, null);

      setWallet(walletConnection);
    };

    loadNearWallet().catch(console.log);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  return useContext(AuthContext);
};
