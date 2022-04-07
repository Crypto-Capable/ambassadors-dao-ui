import { Box, Button, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { CreateNewButton } from '../../../components/dashboard/create-new-button';
import { PayoutListItem } from '../../../components/dashboard/payout-list-item';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import { pageItemsLimit as limit } from '../../../util/constants';
import {
  BountyType,
  LayoutPage,
  Payout,
  Tabs,
  WithContractChildProps,
} from '../../../types';

const BountiesList: NextPage<WithContractChildProps> = ({ contract }) => {
  const [page, setPage] = useState(1);
  const [bounties, setBounties] = useState<Payout<BountyType>[] | null>(null);

  useEffect(() => {
    contract
      .get_all_bounties({
        from_index: (page - 1) * limit,
        limit: 12,
      })
      .then(setBounties)
      .catch(console.log);

    return () => {
      setBounties(null);
    };
  }, [contract, page]);

  return (
    <>
      <Head>
        <title>All Bounties</title>
      </Head>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h2" fontSize="1.75rem">
          Viewing all bounties
        </Heading>
        <CreateNewButton href={`/dashboard/${Tabs.BOUNTIES}/new`} />
      </Flex>
      <Box mt="8" experimental_spaceY="4">
        {bounties === null ? (
          <Center>
            <Spinner />
          </Center>
        ) : bounties.length === 0 ? (
          'No bounties to see!'
        ) : (
          bounties.map((p) => (
            <PayoutListItem
              key={p.id}
              description={p.description}
              status={p.status}
              proposer={p.proposer}
              id={p.id}
              link={`/dashboard/${Tabs.BOUNTIES}/${p.id}`}
            />
          ))
        )}
      </Box>
      {bounties?.length == limit && (
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

const BountiesListPage = withContract(BountiesList) as LayoutPage;

BountiesListPage.layout = Layouts.DASHBOARD;

export default BountiesListPage;
