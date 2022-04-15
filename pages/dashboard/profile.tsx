import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import AmbassadorProfilePage from '../../components/dashboard/ambassador-profile-page';
import withContract from '../../hoc/with-contract';
import { Layouts } from '../../layouts';
import { LayoutPage, WithContractChildProps } from '../../types';

const ProfilePage: NextPage<WithContractChildProps> = ({
  contract,
  isCouncilMember,
}) => (
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
      {isCouncilMember ? null : <AmbassadorProfilePage />}
    </Box>
  </>
);

const ProposalsListPage = withContract(ProfilePage) as LayoutPage;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
