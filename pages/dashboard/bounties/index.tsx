import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
  Tooltip,
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
import { CaretLeft, CaretRight } from 'phosphor-react';

const BountiesList: React.FC<PayoutListProps> = ({ contract }) => {
  const [page, setPage] = useState(1);
  const from = (page - 1) * limit + 1;
  const { data, loading, error } = useBounties({ contract, from, limit });
  if (data !== undefined) {
    return (
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
        <Flex alignItems="center" mt={8} justifyContent="space-between">
          <Tooltip label="Show previous page">
            <IconButton
              variant="outline"
              icon={<CaretLeft />}
              disabled={page < 2}
              onClick={() => setPage((p) => p - 1)}
              aria-label="Show previous page"
            />
          </Tooltip>
          <Tooltip label="Show next page">
            <IconButton
              variant="outline"
              icon={<CaretRight />}
              disabled={data?.length !== limit}
              onClick={() => setPage((p) => p + 1)}
              aria-label="Show next page"
            />
          </Tooltip>
        </Flex>
      </>
    );
  } else if (!loading && error) {
    return <Text>Not Found</Text>;
  } else if (loading === false && data === undefined) {
    return <Text mt="2"> No bounties to view</Text>;
  } else {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }
};

const BountiesPage: NextPage<WithContractChildProps> = ({ contract }) => (
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

const BountiesListPage = withContract(BountiesPage) as LayoutPage;

BountiesListPage.layout = Layouts.DASHBOARD;

export default BountiesListPage;
