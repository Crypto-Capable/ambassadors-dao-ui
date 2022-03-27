import { Contract } from 'near-api-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './auth-context';
import { CustomContract } from '../types';

type ContractContextType = {
  contract: CustomContract;
  isCouncilMember: boolean;
} | null;

export const ContractContext = createContext<ContractContextType>(null);

const viewMethods = [
  'version',
  'get_config',
  'get_policy',
  'is_council_member',
  'is_registered_ambassador',
  'get_all_proposals',
  'get_proposal',
  'get_last_proposal_id',
  'get_all_bounties',
  'get_bounty',
  'get_last_bounty_id',
  'get_all_referrals',
  'get_referral',
  'get_last_referral_id',
  'get_all_miscellaneous',
  'get_miscellaneous',
  'get_last_miscellaneous_id',
];

const changeMethods = [
  'add_payout_proposal',
  'add_payout_bounty',
  'add_payout_referral',
  'add_payout_miscellaneous',
  'register_ambassador',
  'get_council_referral_token',
  'get_ambassador_referral_token',
];

export const ContractProvider: React.FC = ({ children }) => {
  const [contract, setContract] = useState<{
    contract: CustomContract;
    isCouncilMember: boolean;
  } | null>(null);
  const { wallet } = useAuthContext();

  useEffect(() => {
    if (!wallet) return;

    const contract = new Contract(
      wallet.account(),
      process.env.NEXT_PUBLIC_CONTRACT_NAME,
      {
        viewMethods: viewMethods,
        changeMethods: changeMethods,
      }
    ) as CustomContract;

    const accountId = wallet.getAccountId();

    if (!accountId) return;

    contract
      .is_council_member({ account_id: accountId })
      .then((isCouncilMember) => {
        setContract({
          contract,
          isCouncilMember,
        });
      });
  }, [wallet]);

  return (
    <ContractContext.Provider value={contract}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => useContext(ContractContext);
