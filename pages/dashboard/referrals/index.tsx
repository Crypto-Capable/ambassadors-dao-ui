import { Flex, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { CreateNewButton } from '../../../components/dashboard/create-new-button';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  LayoutPage,
  PayoutType,
  ReferralType,
  Tabs,
  WithContractChildProps,
} from '../../../types';
import { useReferrals } from '../../../hooks/payout-hooks';
import PayoutsList from '../../../components/dashboard/payouts-list';

const ReferralsPage: NextPage<WithContractChildProps> = ({ contract }) => (
  <>
    <Head>
      <title>All Referrals</title>
    </Head>
    <Flex alignItems="center" justifyContent="space-between" mb="4">
      <Heading as="h2" fontSize="1.75rem">
        Viewing all referrals
      </Heading>
      <CreateNewButton href={`/dashboard/${Tabs.REFERRALS}/new`} />
    </Flex>
    <PayoutsList<ReferralType>
      contract={contract}
      label={PayoutType.REFERRAL}
      tab={Tabs.REFERRALS}
      usePayoutData={useReferrals}
    />
  </>
);

const ProposalsListPage = withContract(ReferralsPage) as LayoutPage;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
