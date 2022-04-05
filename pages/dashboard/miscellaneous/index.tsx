import { Box, Button, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { CreateNewButton } from '../../../components/dashboard/create-new-button';
import { PayoutListItem } from '../../../components/dashboard/payout-list-item';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  LayoutPage,
  MiscellaneousType,
  Payout,
  Tabs,
  WithContractChildProps,
} from '../../../types';

const limit = 12;

const MiscellaneousList: NextPage<WithContractChildProps> = ({ contract }) => {
  const [page, setPage] = useState(1);
  const [miscellaneous, setMiscellaneous] = useState<
    Payout<MiscellaneousType>[] | null
  >(null);

  useEffect(() => {
    contract
      .get_all_miscellaneous({
        from_index: (page - 1) * limit,
        limit: limit,
      })
      .then(setMiscellaneous)
      .catch(console.log);

    return () => {
      setMiscellaneous(null);
    };
  }, [contract, page]);

  return (
    <>
      <Head>
        <title>All Miscellaneous Payouts</title>
      </Head>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h2" fontSize="1.75rem">
          Viewing all miscellaneous payouts
        </Heading>
        <CreateNewButton href={`/dashboard/${Tabs.MISCELLANEOUS}/new`} />
      </Flex>
      <Box mt="8" experimental_spaceY="4">
        {miscellaneous === null ? (
          <Center>
            <Spinner />
          </Center>
        ) : miscellaneous.length === 0 ? (
          'No referrals to see!'
        ) : (
          miscellaneous.map((p) => (
            <PayoutListItem
              key={p.id}
              {...p}
              link={`/dashboard/${Tabs.MISCELLANEOUS}/${p.id}`}
            />
          ))
        )}
      </Box>
      {miscellaneous?.length == limit && (
        <Flex alignItems="center" justifyContent="space-between">
          {page > 1 && (
            <Button onClick={() => setPage((p) => p + 1)}>Show Next</Button>
          )}
          <Button onClick={() => setPage((p) => p + 1)}>Show Next</Button>
        </Flex>
      )}
    </>
  );
};

const ProposalsListPage = withContract(MiscellaneousList) as LayoutPage;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
