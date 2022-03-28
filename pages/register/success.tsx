import { Center, Heading, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReferralTokenInput from '../../components/register/referral-token-input';
import { useContractContext } from '../../context/contract-context';
import { Tabs } from '../../types';

const SuccessPage = () => {
  const [displayReferralInput, setDisplayReferralInput] = useState(false);

  const { replace } = useRouter();
  const contractContext = useContractContext();

  useEffect(() => {
    if (!contractContext) return;
    const { isCouncilMember, contract } = contractContext;
    if (isCouncilMember) {
      replace(`/dashboard/${Tabs.PROPOSALS}`);
    } else {
      contract
        .is_registered_ambassador({ account_id: contract.account.accountId })
        .then((v) => {
          if (v) {
            replace(`/dashboard/${Tabs.PROFILE}`);
          } else {
            setDisplayReferralInput(true);
          }
        })
        .catch(console.log);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractContext]);

  return (
    <>
      <Head>
        <title>Successfull Registration</title>
      </Head>
      <Center height="100vh" width="100vw" flexDirection="column">
        {displayReferralInput ? (
          <ReferralTokenInput />
        ) : (
          <>
            <Heading>Setting up your dashboard</Heading>
            <Spinner mt="6" />
          </>
        )}
      </Center>
    </>
  );
};

export default SuccessPage;
