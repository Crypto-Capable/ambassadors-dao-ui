import { Box, Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PayoutItemDescription } from '../../../components/dashboard/payout-item-description';
import {
  HackathonProposalItem,
  MemeContestProposalItem,
  OpenProposalItem,
} from '../../../components/dashboard/proposals';
import RemovePayout from '../../../components/dashboard/remove-payout';
import VotesDisplay from '../../../components/dashboard/voting';
import StatusBadge from '../../../components/status-badge';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  WithContractChildProps,
  LayoutPage,
  TypesOfProposals,
  PayoutType,
} from '../../../types';
import { useProposal } from '../../../hooks/payout-hooks';

const ProposalItem: NextPage<WithContractChildProps> = ({
  contract,
  isCouncilMember,
}) => {
  const { id } = useRouter().query as { id: string };
  const { data: proposal, loading } = useProposal({ contract, id: Number(id) });
  if (proposal !== undefined) {
    return (
      <>
        <Head>
          <title>All Proposals</title>
        </Head>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex flexDir="column">
            <Heading as="h2" fontSize="1.75rem">
              Viewing proposal {id}
            </Heading>
            {proposal && (
              <Box>
                <StatusBadge status={proposal.status} />{' '}
              </Box>
            )}
          </Flex>
          {contract.account.accountId === proposal?.proposer && (
            <RemovePayout payoutId={id} payoutType={PayoutType.PROPOSAL} />
          )}
        </Flex>
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
      </>
    );
  } else if (proposal === undefined && !loading) {
    return <Text>Not Found</Text>;
  } else {
    return (
      <Center height="full">
        <Spinner />
      </Center>
    );
  }
};

const ProposalItemPage = withContract(ProposalItem) as LayoutPage;

ProposalItemPage.layout = Layouts.DASHBOARD;

export default ProposalItemPage;
