import { Flex, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { CreateNewButton } from '../../../components/dashboard/create-new-button';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  BountyType,
  LayoutPage,
  PayoutType,
  Tabs,
  WithContractChildProps,
} from '../../../types';
import { useBounties } from '../../../hooks/payout-hooks';
import PayoutsList from '../../../components/dashboard/payouts-list';

const BountiesPage: NextPage<WithContractChildProps> = ({ contract }) => (
  <>
    <Head>
      <title>All Bounties</title>
    </Head>
    <Flex alignItems="center" justifyContent="space-between" mb="4">
      <Heading as="h2" fontSize="1.75rem">
        Viewing all bounties
      </Heading>
      <CreateNewButton href={`/dashboard/${Tabs.BOUNTIES}/new`} />
    </Flex>
    <PayoutsList<BountyType>
      contract={contract}
      label={PayoutType.BOUNTY}
      tab={Tabs.BOUNTIES}
      usePayoutData={useBounties}
    />
  </>
);

const BountiesListPage = withContract(BountiesPage) as LayoutPage;

BountiesListPage.layout = Layouts.DASHBOARD;

export default BountiesListPage;
