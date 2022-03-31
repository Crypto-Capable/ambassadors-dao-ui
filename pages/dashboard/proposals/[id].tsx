import { Box, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PayoutItemDescription } from '../../../components/dashboard/payout-item-description';
import {
  HackathonProposalItem,
  MemeContestProposalItem,
  OpenProposalItem,
} from '../../../components/dashboard/proposals';
import RemovePayout from '../../../components/dashboard/remove-payout';
import VotesDisplay from '../../../components/dashboard/voting';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  WithContractChildProps,
  LayoutPage,
  Payout,
  ProposalType,
  Tabs,
  TypesOfProposals,
  PayoutType,
} from '../../../types';

const ProposalItem: NextPage<WithContractChildProps> = ({
  contract,
  isCouncilMember,
}) => {
  const { id } = useRouter().query as { id: string };
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
        {contract.account.accountId === proposal?.proposer && (
          <RemovePayout payoutId={id} payoutType={PayoutType.PROPOSAL} />
        )}
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
          <VotesDisplay
            accountId={contract.account.accountId}
            isCouncilMember={isCouncilMember}
            votes={proposal.votes}
            votes_count={proposal.votes_count}
            payoutId={id}
            payoutType={PayoutType.PROPOSAL}
          />
        </Box>
      )}
    </>
  );
};

const ProposalItemPage = withContract(ProposalItem) as LayoutPage;

ProposalItemPage.layout = Layouts.DASHBOARD;

export default ProposalItemPage;
