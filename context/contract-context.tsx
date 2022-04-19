import { Contract } from 'near-api-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './auth-context';
import { CustomContract } from '../types';
import { captureException } from '@sentry/nextjs';
import { ambassadorProfileAtom } from '../atoms';
import { useAtom } from 'jotai';

type ContractContextType = {
  contract: CustomContract;
  isCouncilMember: boolean;
} | null;

export const ContractContext = createContext<ContractContextType>(null);

const viewMethods = [
  'version',
  'get_council',
  'is_council_member',
  'is_registered_ambassador',
  'get_ambassador_profile',
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
  'act_payout_proposal',
  'act_payout_bounty',
  'act_payout_referral',
  'act_payout_miscellaneous',
  'register_ambassador',
  'add_registration_referral_with_token',
];

export const ContractProvider: React.FC = ({ children }) => {
  const [contractContext, setContractContext] = useState<{
    contract: CustomContract;
    isCouncilMember: boolean;
  } | null>(null);
  const { wallet } = useAuthContext();
  const [, setProfile] = useAtom(ambassadorProfileAtom);

  useEffect(() => {
    if (!wallet) return;

    const contract = new Contract(
      wallet.account(),
      process.env.NEXT_PUBLIC_CONTRACT_NAME,
      { viewMethods, changeMethods }
    ) as CustomContract;

    const accountId = wallet.getAccountId();

    if (!accountId) return;

    contract
      .is_council_member({ account_id: accountId })
      .then((isCouncilMember) => {
        setContractContext({
          contract,
          isCouncilMember,
        });
      })
      .catch(captureException);
  }, [wallet]);

  useEffect(() => {
    if (!contractContext) {
      setProfile(null);
      return;
    }

    const { contract, isCouncilMember } = contractContext;
    if (!isCouncilMember) {
      contract
        .get_ambassador_profile({
          account_id: contract.account.accountId,
        })
        .then(setProfile)
        .catch(captureException);
    }
  }, [contractContext, setProfile]);

  return (
    <ContractContext.Provider value={contractContext}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => useContext(ContractContext);
