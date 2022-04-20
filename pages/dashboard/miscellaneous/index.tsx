import { Flex, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { CreateNewButton } from '../../../components/dashboard/create-new-button';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  LayoutPage,
  MiscellaneousType,
  PayoutType,
  Tabs,
  WithContractChildProps,
} from '../../../types';
import { useMiscellanea } from '../../../hooks/payout-hooks';
import PayoutsList from '../../../components/dashboard/payouts-list';

const MiscellaneousPage: NextPage<WithContractChildProps> = ({ contract }) => (
  <>
    <Head>
      <title>All Miscellaneous Payouts</title>
    </Head>
    <Flex alignItems="center" justifyContent="space-between" mb="4">
      <Heading as="h2" fontSize="1.75rem">
        Viewing all miscellaneous payouts
      </Heading>
      <CreateNewButton href={`/dashboard/${Tabs.MISCELLANEOUS}/new`} />
    </Flex>
    <PayoutsList<MiscellaneousType>
      contract={contract}
      label={PayoutType.MISCELLANEOUS}
      tab={Tabs.MISCELLANEOUS}
      usePayoutData={useMiscellanea}
    />
  </>
);

const ProposalsListPage = withContract(MiscellaneousPage) as LayoutPage;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
