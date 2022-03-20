import {
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spinner,
  chakra,
  Button,
  Flex,
  Box,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/auth-context';
import { useContractContext } from '../../context/contract-context';
import { Tabs } from '../../types';

const Agh = () => {
  const [referralToken, setReferralToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const contract = useContractContext()!;
  const { replace } = useRouter();

  const handleSubmit = () => {
    setLoading(true);
    contract.contract
      .register_ambassador({ token: referralToken })
      .then(() => replace(`/dashboard/${Tabs.PROPOSALS}`))
      .catch(() => {
        toast({
          status: 'error',
          description: 'Incorrect referral token',
        });
      })
      .finally(() => setLoading(false));
  };

  const handleSkip = () => {
    setLoading(true);
    contract.contract
      .register_ambassador({ token: null })
      .then(() => replace(`/dashboard/${Tabs.PROPOSALS}`))
      .finally(() => setLoading(false));
  };

  return (
    <Box experimental_spaceY="4">
      <FormControl isRequired>
        <FormLabel htmlFor="referralToken">Referral Token</FormLabel>
        <Input
          id="referralToken"
          type="text"
          value={referralToken ?? ''}
          onChange={({ target: { value } }) => setReferralToken(value)}
        />
        <FormHelperText>A referral token to be used.</FormHelperText>
      </FormControl>
      <Button mr="4" isLoading={loading} onClick={handleSubmit}>
        Submit Referral Token
      </Button>
      <Button isLoading={loading} variant="outline" onClick={handleSkip}>
        Don&apos;t have a referral token?
      </Button>
    </Box>
  );
};

const Success = () => {
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
        .then(() => replace(`/dashboard/${Tabs.PROPOSALS}`))
        .catch(() => {
          setDisplayReferralInput(true);
        });
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
          <Agh />
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

export default Success;
