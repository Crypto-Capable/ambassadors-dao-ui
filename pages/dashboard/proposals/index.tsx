import Head from 'next/head';
import React from 'react';
import { Layouts } from '../../../layouts';
import { LayoutPage } from '../../../types';

const ProposalsList: LayoutPage = () => {
  return (
    <>
      <Head>
        <title>All Proposals</title>
      </Head>
      <div>Proposal Items</div>
    </>
  );
};

ProposalsList.layout = Layouts.DASHBOARD;

export default ProposalsList;
