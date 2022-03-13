import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import { CustomContract, LayoutPage, Payout } from '../../../types';

type ReferralsListProps = {
  contract: CustomContract;
};

const ReferralsList: NextPage<ReferralsListProps> = ({ contract }) => {
  const [referrals, setReferrals] = useState<Payout[]>([]);

  useEffect(() => {
    contract
      .viewAllReferrals({
        startIndex: 0,
        limit: 12,
      })
      .then(setReferrals)
      .catch();
  }, [contract]);

  return (
    <>
      <Head>
        <title>All Referrals</title>
      </Head>
      <div>Referral Items</div>
    </>
  );
};

const ProposalsListPage = withContract(ReferralsList) as LayoutPage<{}>;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
