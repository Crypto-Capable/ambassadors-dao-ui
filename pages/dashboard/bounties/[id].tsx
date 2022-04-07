import { Box, Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import StatusBadge from '../../../components/status-badge';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  ContentCoordinationItem,
  HackathonCompletionItem,
  MemeCompletionItem,
  WebinarCompletionItem,
} from '../../../components/dashboard/bounties';
import { PayoutItemDescription } from '../../../components/dashboard/payout-item-description';
import VotesDisplay from '../../../components/dashboard/voting';
import RemovePayout from '../../../components/dashboard/remove-payout';
import {
  BountyType,
  LayoutPage,
  Payout,
  PayoutType,
  TypesOfBounties,
  WithContractChildProps,
} from '../../../types';
import { useBounty } from '../../../hooks/payout-hooks';

const BountyItem: NextPage<WithContractChildProps> = ({
  contract,
  isCouncilMember,
}) => {
  const { id } = useRouter().query as { id: string };
  const { data: bounty, loading } = useBounty({ contract, id: Number(id) });
  if (bounty !== undefined)
    return (
      <>
        <Head>
          <title>All Proposals</title>
        </Head>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex flexDirection={'column'}>
            <Heading mr={2} as="h2" fontSize="1.75rem">
              Viewing bounty {id}
            </Heading>
            {bounty && (
              <Box>
                <StatusBadge status={bounty.status} />
              </Box>
            )}
          </Flex>
          {contract.account.accountId === bounty?.proposer && (
            <RemovePayout payoutId={id} payoutType={PayoutType.BOUNTY} />
          )}
        </Flex>
        <Box mt="8">
          <PayoutItemDescription
            description={bounty.description}
            proposer={bounty.proposer}
          />
          {(() => {
            if (TypesOfBounties.HACKATHON_COMPLETION in bounty.info) {
              return (
                <HackathonCompletionItem
                  item={bounty.info[TypesOfBounties.HACKATHON_COMPLETION]}
                />
              );
            } else if (TypesOfBounties.MEME_CONTEST_COMPLETION in bounty.info) {
              return (
                <MemeCompletionItem
                  item={bounty.info[TypesOfBounties.MEME_CONTEST_COMPLETION]}
                />
              );
            } else if (TypesOfBounties.WEBINAR in bounty.info) {
              return (
                <WebinarCompletionItem
                  item={bounty.info[TypesOfBounties.WEBINAR]}
                />
              );
            } else if (TypesOfBounties.CONTENT_COORDINATION in bounty.info) {
              return (
                <ContentCoordinationItem
                  item={bounty.info[TypesOfBounties.CONTENT_COORDINATION]}
                />
              );
            }
          })()}
          <VotesDisplay
            accountId={contract.account.accountId}
            isCouncilMember={isCouncilMember}
            votes={bounty.votes}
            votes_count={bounty.votes_count}
            payoutId={id}
            payoutType={PayoutType.BOUNTY}
          />
        </Box>
      </>
    );
  else if (bounty === undefined && !loading) return <Text>Not Found</Text>;
  else {
    return (
      <Center height="full">
        <Spinner />
      </Center>
    );
  }
};

const BountyItemPage = withContract(BountyItem) as LayoutPage;

BountyItemPage.layout = Layouts.DASHBOARD;

export default BountyItemPage;
