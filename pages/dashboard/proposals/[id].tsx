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
import { useRouter } from 'next/router';
import { Plus } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { PayoutItemDescription } from '../../../components/dashboard/payout-item-description';
import {
  HackathonProposalItem,
  MemeContestProposalItem,
  OpenProposalItem,
} from '../../../components/dashboard/proposals';
import { useContractContext } from '../../../context/contract-context';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  LayoutPage,
  Payout,
  ProposalType,
  Tabs,
  TypesOfProposals,
} from '../../../types';

const ProposalItem: NextPage = () => {
  const { id } = useRouter().query as { id: string };
  const { contract } = useContractContext()!;
  const [proposal, setProposal] = useState<Payout<ProposalType> | null>(null);

  useEffect(() => {
    contract.get_proposal({ id: Number(id) }).then(setProposal);

    return () => {
      // whenever the contract or id changes, it sets the proposal to null
      // hence it will show a spinner
      setProposal(null);
    };
  }, [contract, id, setProposal]);

  const isLoading = proposal === null;
  return (
    <>
      <Head>
        <title>All Proposals</title>
      </Head>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h2" fontSize="1.75rem">
          Viewing proposal {id}
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
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Box mt="8">
          <PayoutItemDescription
            description={proposal.description}
            proposer={proposal.proposer}
          >
            {(() => {
              if (TypesOfProposals.HACKATHON in proposal.info)
                return (
                  <HackathonProposalItem
                    item={proposal.info[TypesOfProposals.HACKATHON]}
                  />
                );
              else if (TypesOfProposals.MEME_CONTEST in proposal.info)
                return (
                  <MemeContestProposalItem
                    item={proposal.info[TypesOfProposals.MEME_CONTEST]}
                  />
                );
              else if (TypesOfProposals.OPEN in proposal.info)
                return (
                  <OpenProposalItem
                    item={proposal.info[TypesOfProposals.OPEN]}
                  />
                );
            })()}
          </PayoutItemDescription>
        </Box>
      )}
    </>
  );
};

const ProposalItemPage = withContract(ProposalItem) as LayoutPage;
ProposalItemPage.layout = Layouts.DASHBOARD;
export default ProposalItemPage;
