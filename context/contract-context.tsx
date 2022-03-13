import { Contract } from 'near-api-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './auth-context';
import { CustomContract } from '../types';

type ContractContextType = CustomContract | null;

export const ContractContext = createContext<ContractContextType>(null);

const viewMethods = ['viewAllProposals'];

const changeMethods: string[] = [];

export const ContractProvider: React.FC = ({ children }) => {
  const [contract, setContract] = useState<CustomContract | null>(null);
  const { wallet } = useAuthContext();

  // useEffect(() => {
  //   if (!wallet) return;

  //   const contract = new Contract(
  //     wallet.account(),
  //     'ambassadors-dao.cc-daos.testnet',
  //     {
  //       viewMethods: viewMethods,
  //       changeMethods: changeMethods,
  //     }
  //   ) as CustomContract;

  //   setContract(contract);
  // }, [wallet]);

  return (
    <ContractContext.Provider value={contract}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => useContext(ContractContext);
