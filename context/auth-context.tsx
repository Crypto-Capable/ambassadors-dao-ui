import { createContext, useContext, useEffect, useState } from 'react';
import { keyStores, connect, WalletConnection } from 'near-api-js';
import { useRouter } from 'next/router';

const config = {
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org/',
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
  const router = useRouter();
  const [wallet, setWallet] = useState<WalletConnection | null>(null);

  const value: AuthContextType = {
    signIn: async () => {
      try {
        // make sure wallet connection has been established
        await wallet!.requestSignIn(
          process.env.NEXT_PUBLIC_CONTRACT_NAME,
          "Crypto Capable Ambassadors' DAO",
          `${process.env.NEXT_PUBLIC_HOST}/callback/success`,
          `${process.env.NEXT_PUBLIC_HOST}/callback/failure`
        );
        router.push('/dashboard');
      } catch (error) {
        console.log(error);
      }
    },
    signOut: () => {
      // make sure wallet connection has been established
      wallet!.signOut();
      setWallet(null);
      router.push('/');
    },
    wallet,
  };

  useEffect(() => {
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

    loadNearWallet().catch();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  return useContext(AuthContext);
};
