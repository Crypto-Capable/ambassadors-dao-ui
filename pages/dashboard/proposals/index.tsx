import { Flex, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { CreateNewButton } from '../../../components/dashboard/create-new-button';
import withContract from '../../../hoc/with-contract';
import { useProposals } from '../../../hooks/payout-hooks';
import { Layouts } from '../../../layouts';
import {
  WithContractChildProps,
  LayoutPage,
  Tabs,
  PayoutType,
  ProposalType,
} from '../../../types';
import PayoutsList from '../../../components/dashboard/payouts-list';

const ProposalsPage: NextPage<WithContractChildProps> = ({ contract }) => (
  <>
    <Head>
      <title>All Proposals</title>
    </Head>
    <Flex alignItems="center" justifyContent="space-between" mb="4">
      <Heading as="h2" fontSize="1.75rem">
        Viewing all proposals
      </Heading>
      <CreateNewButton href={`/dashboard/${Tabs.PROPOSALS}/new`} />
    </Flex>
    <PayoutsList<ProposalType>
      contract={contract}
      label={PayoutType.PROPOSAL}
      tab={Tabs.PROPOSALS}
      usePayoutData={useProposals}
    />
  </>
);

const ProposalsListPage = withContract(ProposalsPage) as LayoutPage;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
