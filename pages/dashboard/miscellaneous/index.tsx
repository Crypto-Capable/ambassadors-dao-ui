import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  CustomContract,
  LayoutPage,
  MiscellaneousType,
  Payout,
} from '../../../types';

type MiscellaneousListPropos = {
  contract: CustomContract;
};

const MiscellaneousList: NextPage<MiscellaneousListPropos> = ({ contract }) => {
  const [miscellaneous, setMiscellaneous] = useState<
    Payout<MiscellaneousType>[]
  >([]);

  useEffect(() => {
    contract
      .get_all_miscellaneous({
        startIndex: 0,
        limit: 12,
      })
      .then(setMiscellaneous)
      .catch();
  }, [contract]);

  return (
    <>
      <Head>
        <title>All Miscellaneous</title>
      </Head>
      <div>Miscellaneous Items</div>
    </>
  );
};

const BountiesListPage = withContract(MiscellaneousList) as LayoutPage<{}>;

BountiesListPage.layout = Layouts.DASHBOARD;

export default BountiesListPage;
