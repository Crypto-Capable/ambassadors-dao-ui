import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link as ChakraLink,
  Spinner,
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
  Payout,
  ProposalType,
  Tabs,
} from '../../../types';

type ProposalsListProps = {
  contract: CustomContract;
};

const ProposalsList: NextPage<ProposalsListProps> = ({ contract }) => {
  const [proposals, setProposals] = useState<Payout<ProposalType>[] | null>(
    null
  );

  useEffect(() => {
    contract
      .get_all_proposals({
        from_index: 0,
        limit: 12,
      })
      .then(setProposals)
      .catch(console.log);
  }, [contract]);

  return (
    <>
      <Head>
        <title>All Proposals</title>
      </Head>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h2" fontSize="1.75rem">
          Viewing all proposals
        </Heading>
        <Link href={`/dashboard/${Tabs.PROPOSALS}/new`} passHref>
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
        {proposals === null ? (
          <Center>
            <Spinner />
          </Center>
        ) : proposals.length === 0 ? (
          'No proposals yet, create one!'
        ) : (
          proposals.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/${Tabs.PROPOSALS}/${p.id}`}
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

const ProposalsListPage = withContract(ProposalsList) as LayoutPage;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
