import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { CreateNewButton } from '../../../components/dashboard/create-new-button';
import { PayoutListItem } from '../../../components/dashboard/payout-list-item';
import withContract from '../../../hoc/with-contract';
import { useProposals } from '../../../hooks/payout-hooks';
import { Layouts } from '../../../layouts';
import { pageItemsLimit as limit } from '../../../util/constants';
import {
  WithContractChildProps,
  LayoutPage,
  Tabs,
  PayoutListProps,
} from '../../../types';

const ProposalsList: React.FC<PayoutListProps> = ({ contract }) => {
  const [page, setPage] = useState(1);
  const from = (page - 1) * limit + 1;
  const { data, loading, error } = useProposals({ contract, from, limit });

  if (data !== undefined) {
    return data.length === 0 ? (
      <Text>No proposals to view!</Text>
    ) : (
      <>
        <Box experimental_spaceY="4" mt="8">
          {data.map((p) => (
            <PayoutListItem
              key={p.id}
              description={p.description}
              status={p.status}
              proposer={p.proposer}
              id={p.id}
              link={`/dashboard/${Tabs.PROPOSALS}/${p.id}`}
            />
          ))}
        </Box>
        {data?.length == limit && (
          <Flex alignItems="center" justifyContent="space-between">
            {page > 1 && (
              <Button onClick={() => setPage((p) => p - 1)}>Show Prev</Button>
            )}
            <Button onClick={() => setPage((p) => p + 1)}>Show Next</Button>
          </Flex>
        )}
      </>
    );
  } else if (!loading && error) {
    return <Text>Not Found</Text>;
  } else {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }
};

const ProposalsPage: NextPage<WithContractChildProps> = ({ contract }) => {
  const [page, setPage] = useState(1);

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
      <ProposalsList contract={contract} />
      {/* {proposals?.length == limit && (
        <Flex alignItems="center" justifyContent="space-between">
          {page > 1 && (
            <Button onClick={() => setPage((p) => p + 1)}>Show Next</Button>
          )}
          <Button onClick={() => setPage((p) => p + 1)}>Show Next</Button>
        </Flex>
      )} */}
    </>
  );
};

const ProposalsListPage = withContract(ProposalsPage) as LayoutPage;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
