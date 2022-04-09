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
import { useState } from 'react';
import { CreateNewButton } from '../../../components/dashboard/create-new-button';
import { PayoutListItem } from '../../../components/dashboard/payout-list-item';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import { pageItemsLimit as limit } from '../../../util/constants';
import {
  LayoutPage,
  PayoutListProps,
  Tabs,
  WithContractChildProps,
} from '../../../types';
import { useBounties } from '../../../hooks/payout-hooks';

const BountiesList: React.FC<PayoutListProps> = ({ contract }) => {
  const [page, setPage] = useState(1);
  const from = (page - 1) * limit + 1;
  const { data, loading, error } = useBounties({ contract, from, limit });
  if (data !== undefined) {
    return data.length === 0 ? (
      <Text>No bounties to view!</Text>
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
              link={`/dashboard/${Tabs.BOUNTIES}/${p.id}`}
            />
          ))}
        </Box>
        {(data?.length == limit || page > 1) && (
          <Flex alignItems="center" mt={4} justifyContent="space-between">
            {page > 1 && (
              <Button onClick={() => setPage((p) => p - 1)}>Show Prev</Button>
            )}
            {data?.length == limit && (
              <Button onClick={() => setPage((p) => p + 1)}>Show Next</Button>
            )}
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

const BountiesPage: NextPage<WithContractChildProps> = ({ contract }) => {
  const [page, setPage] = useState(1);

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
      <BountiesList contract={contract} />
    </>
  );
};

const BountiesListPage = withContract(BountiesPage) as LayoutPage;

BountiesListPage.layout = Layouts.DASHBOARD;

export default BountiesListPage;
