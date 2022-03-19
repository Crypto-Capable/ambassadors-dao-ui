import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Plus, Spinner } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import StatusBadge from '../../../components/status-badge';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  BountyType,
  CustomContract,
  LayoutPage,
  Payout,
  Tabs,
} from '../../../types';

type BountiesListPropos = {
  contract: CustomContract;
};

const BountiesList: NextPage<BountiesListPropos> = ({ contract }) => {
  const [bounties, setBounties] = useState<Payout<BountyType>[]>([]);

  useEffect(() => {
    contract
      .get_all_bounties({
        from_index: 0,
        limit: 12,
      })
      .then(setBounties)
      .catch(console.log);
  }, [contract]);

  return (
    <>
      <Head>
        <title>All Bounties</title>
      </Head>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h2" fontSize="1.75rem">
          Viewing all bounties
        </Heading>
        <Link href={`/dashboard/${Tabs.BOUNTIES}/new`} passHref>
          <Button
            size="sm"
            rightIcon={<Plus weight="bold" />}
            variant="outline"
            as={ChakraLink}
          >
            Create New
          </Button>
        </Link>
      </Flex>
      <Box mt="8" experimental_spaceY="4">
        {bounties === null ? (
          <Center>
            <Spinner />
          </Center>
        ) : bounties.length === 0 ? (
          'No bounties yet, create one!'
        ) : (
          bounties.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/${Tabs.BOUNTIES}/${p.id}`}
              passHref
            >
              <ChakraLink
                as={Flex}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Text display="inline-block">
                    <strong>{p.id}&gt;</strong> {p.description}
                  </Text>
                </Box>
                <StatusBadge status={p.status} />
              </ChakraLink>
            </Link>
          ))
        )}
      </Box>
    </>
  );
};

const BountiesListPage = withContract(BountiesList) as LayoutPage;

BountiesListPage.layout = Layouts.DASHBOARD;

export default BountiesListPage;
