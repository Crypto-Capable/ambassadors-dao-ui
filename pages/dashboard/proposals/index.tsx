import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import { CustomContract, LayoutPage, Payout } from '../../../types';

type ProposalsListProps = {
  contract: CustomContract;
};

const ProposalsList: NextPage<ProposalsListProps> = ({ contract }) => {
  const [proposals, setProposals] = useState<Payout[]>([]);

  useEffect(() => {
    contract
      .viewAllProposals({
        startIndex: 0,
        limit: 12,
      })
      .then(setProposals)
      .catch();
  }, [contract]);

  return (
    <>
      <Head>
        <title>All Proposals</title>
      </Head>
      <div>Proposal Items</div>
    </>
  );
};

const ProposalsListPage = withContract(ProposalsList) as LayoutPage<{}>;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
