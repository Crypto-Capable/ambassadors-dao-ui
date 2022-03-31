import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link as ChakraLink,
  Spinner,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Plus } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { CreateNewButton } from '../../../components/dashboard/create-new-button';
import StatusBadge from '../../../components/status-badge';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  BountyType,
  CustomContract,
  LayoutPage,
  Payout,
  Tabs,
  WithContractChildProps,
} from '../../../types';

const limit = 12;

const BountiesList: NextPage<WithContractChildProps> = ({ contract }) => {
  const [page, setPage] = useState(1);
  const [bounties, setBounties] = useState<Payout<BountyType>[] | null>(null);

  const [isLargerThan480] = useMediaQuery('(min-width: 520px)');
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
            <Link
              key={p.id}
              href={`/dashboard/${Tabs.BOUNTIES}/${p.id}`}
              passHref
            >
              <ChakraLink
                as={Flex}
                alignItems={isLargerThan480 ? 'center' : 'start'}
                justifyContent="space-between"
                flexDir={isLargerThan480 ? 'row' : 'column'}
              >
                <Box>
                  <Text display="inline-block">
                    <strong>{p.id}&gt;</strong> {p.description}
                  </Text>
                </Box>
                <Box>
                  <StatusBadge status={p.status} />
                </Box>
              </ChakraLink>
            </Link>
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
