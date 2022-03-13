import {
  Box,
  Button,
  Flex,
  Heading,
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
  Payout,
  ProposalType,
  Tabs,
} from '../../../types';

type ProposalsListProps = {
  contract: CustomContract;
};

const stub: Payout<ProposalType>[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
].map((n) => {
  const r = Math.random();
  return {
    id: n,
    description: 'asd',
    info: {
      Hackathon: {
        estimated_budget: '10',
        expected_registrations: 50,
        supporting_document: 'asd',
      },
    },
    proposer: 'asd',
    status:
      r > 0.5
        ? r > 0.75
          ? 'UnderConsideration'
          : 'Rejected'
        : r > 0.25
        ? 'Approved'
        : { Removed: null },
    votes: {},
    votes_count: {
      approve_count: 0,
      reject_count: 0,
    },
  };
});

const ProposalsList: NextPage<ProposalsListProps> = ({ contract }) => {
  const [proposals, setProposals] = useState<Payout<ProposalType>[]>(stub);

  useEffect(() => {
    // contract
    //   .get_all_proposals({
    //     startIndex: 0,
    //     limit: 12,
    //   })
    //   .then(setProposals)
    //   .catch(() => setProposals(stub));
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
        {proposals.map((p) => (
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
        ))}
      </Box>
    </>
  );
};

const ProposalsListPage = withContract(ProposalsList) as LayoutPage<{}>;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
