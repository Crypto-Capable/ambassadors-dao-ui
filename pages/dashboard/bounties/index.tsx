import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import { CustomContract, LayoutPage, Payout } from '../../../types';

type BountiesListPropos = {
  contract: CustomContract;
};

const BountiesList: NextPage<BountiesListPropos> = ({ contract }) => {
  const [bounties, setBounties] = useState<Payout[]>([]);

  useEffect(() => {
    contract
      .viewAllBounties({
        startIndex: 0,
        limit: 12,
      })
      .then(setBounties)
      .catch();
  }, [contract]);

  return (
    <>
      <Head>
        <title>All Bounties</title>
      </Head>
      <div>Bounty Items</div>
    </>
  );
};

const BountiesListPage = withContract(BountiesList) as LayoutPage<{}>;

BountiesListPage.layout = Layouts.DASHBOARD;

export default BountiesListPage;
