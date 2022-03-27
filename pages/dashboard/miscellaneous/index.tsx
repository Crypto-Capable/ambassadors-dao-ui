import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Plus } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import StatusBadge from '../../../components/status-badge';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  CustomContract,
  LayoutPage,
  MiscellaneousType,
  Payout,
  Tabs,
} from '../../../types';

type MiscellaneousListProps = {
  contract: CustomContract;
};

const limit = 12;

const MiscellaneousList: NextPage<MiscellaneousListProps> = ({ contract }) => {
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
        <Link href={`/dashboard/${Tabs.MISCELLANEOUS}/new`} passHref>
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
        {miscellaneous === null ? (
          <Center>
            <Spinner />
          </Center>
        ) : miscellaneous.length === 0 ? (
          'No referrals to see!'
        ) : (
          miscellaneous.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/${Tabs.MISCELLANEOUS}/${p.id}`}
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
