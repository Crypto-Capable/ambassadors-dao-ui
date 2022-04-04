import {
  Badge,
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import { Eye, EyeSlash } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { useContractContext } from '../../context/contract-context';
import withContract from '../../hoc/with-contract';
import { Layouts } from '../../layouts';
import { LayoutPage } from '../../types';

const ReferralTokenView = () => {
  // using ! as we are sure contract exists thanks to withContract HOC
  const contractContext = useContractContext()!;
  const toast = useToast();
  const [view, setView] = useState(false);
  const [token, setToken] = useState('loading...');

  useEffect(() => {
    const { contract, isCouncilMember } = contractContext;
    if (isCouncilMember) {
      contract
        .get_council_referral_token({
          account_id: contract.account.accountId,
        })
        .then(setToken)
        .catch(() => {
          toast({
            description: 'Could not fetch referral token',
            status: 'error',
          });
        });
    } else {
      contract
        .get_ambassador_referral_token({
          account_id: contract.account.accountId,
        })
        .then(setToken)
        .catch(() => {
          toast({
            description: 'Could not fetch referral token',
            status: 'error',
          });
        });
    }
  }, [contractContext, toast]);

  return (
    <Flex alignItems="flex-end">
      {view && <Text>{token}</Text>}
      <IconButton
        onClick={() => setView((v) => !v)}
        icon={view ? <EyeSlash /> : <Eye />}
        aria-label="toggle view token"
        size="xs"
        variant="outline"
        ml="2"
      />
    </Flex>
  );
};

const ProfilePage = () => {
  // using ! as we are sure contract exists thanks to withContract HOC
  const { contract, isCouncilMember } = useContractContext()!;

  return (
    <>
      <Head>
        <title>Profile Page</title>
      </Head>
      <Box>
        <Heading as="h2" fontSize="1.75rem">
          Profile Page
        </Heading>
        <Flex mt="8" alignItems="center" justifyContent="space-between">
          <Text>
            Signed in as <strong>{contract.account.accountId}</strong>
          </Text>
          <Badge colorScheme={isCouncilMember ? 'green' : 'cyan'}>
            {isCouncilMember ? 'council member' : 'campus ambassador'}
          </Badge>
        </Flex>
        <Flex mt="8" alignItems="flex-end" justifyContent="space-between">
          <Box>
            <Text>Your referral token</Text>
            <Text>Share to earn 0.5 Near</Text>
          </Box>
          <ReferralTokenView />
        </Flex>
      </Box>
    </>
  );
};

const ProposalsListPage = withContract(ProfilePage) as LayoutPage;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
