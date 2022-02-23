import Head from 'next/head';
import React from 'react';
import { Layouts } from '../../../layouts';
import { LayoutPage } from '../../../types';

const ProposalsList: LayoutPage = () => {
  return (
    <>
      <Head>
        <title>All Miscellaneous</title>
      </Head>
      <div>Miscellaneous Items</div>
    </>
  );
};

ProposalsList.layout = Layouts.DASHBOARD;

export default ProposalsList;
