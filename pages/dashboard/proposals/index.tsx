import { Box, Button, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { CreateNewButton } from '../../../components/dashboard/create-new-button';
import { PayoutListItem } from '../../../components/dashboard/payout-list-item';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  WithContractChildProps,
  LayoutPage,
  Payout,
  ProposalType,
  Tabs,
} from '../../../types';

const limit = 12;

const ProposalsList: NextPage<WithContractChildProps> = ({ contract }) => {
  const [page, setPage] = useState(1);
  const [proposals, setProposals] = useState<Payout<ProposalType>[] | null>(
    null
  );

  useEffect(() => {
    contract
      .get_all_proposals({
        from_index: (page - 1) * limit,
        limit: limit,
      })
      .then(setProposals)
      .catch(console.log);

    return () => {
      setProposals(null);
    };
  }, [contract, page]);

  return (
    <>
      <Head>
        <title>All Proposals</title>
      </Head>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h2" fontSize="1.75rem">
          Viewing all proposals
        </Heading>
        <CreateNewButton href={`/dashboard/${Tabs.PROPOSALS}/new`} />
      </Flex>
      <Box mt="8" experimental_spaceY="4">
        {proposals === null ? (
          <Center>
            <Spinner />
          </Center>
        ) : proposals.length === 0 ? (
          'No proposals to see!'
        ) : (
          proposals.map((p) => (
            <PayoutListItem
              key={p.id}
              description={p.description}
              status={p.status}
              proposer={p.proposer}
              id={p.id}
              link={`/dashboard/${Tabs.PROPOSALS}/${p.id}`}
            />
          ))
        )}
      </Box>
      {proposals?.length == limit && (
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

const ProposalsListPage = withContract(ProposalsList) as LayoutPage;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
