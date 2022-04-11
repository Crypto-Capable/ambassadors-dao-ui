import { Box, Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PayoutItemDescription } from '../../../components/dashboard/payout-item-description';
import {
  AmbassadorReferralItem,
  RecruitmentReferralItem,
  NCDReferralItem,
} from '../../../components/dashboard/referrals/index';
import RemovePayout from '../../../components/dashboard/remove-payout';
import VotesDisplay from '../../../components/dashboard/voting';
import StatusBadge from '../../../components/status-badge';
import withContract from '../../../hoc/with-contract';
import { useReferral } from '../../../hooks/payout-hooks';
import { Layouts } from '../../../layouts';
import {
  WithContractChildProps,
  LayoutPage,
  TypesOfReferrals,
  PayoutType,
} from '../../../types';

const ReferralItem: NextPage<WithContractChildProps> = ({
  contract,
  isCouncilMember,
}) => {
  const { id } = useRouter().query as { id: string };
  const { data: referral, loading } = useReferral({ contract, id: Number(id) });
  if (referral !== undefined)
    return (
      <>
        <Head>
          <title>All Referrals</title>
        </Head>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex flexDir={'column'}>
            <Heading as="h2" fontSize="1.75rem">
              Viewing Referral {id}
            </Heading>
            {referral && (
              <Box>
                <StatusBadge status={referral.status} />
              </Box>
            )}
          </Flex>
          {contract.account.accountId === referral?.proposer && (
            <RemovePayout payoutId={id} payoutType={PayoutType.REFERRAL} />
          )}
        </Flex>
        <Box mt="8">
          <PayoutItemDescription
            description={referral.description}
            proposer={referral.proposer}
          />
          {(() => {
            if (TypesOfReferrals.AMBASSADOR_REGISTRATION in referral.info) {
              return (
                <AmbassadorReferralItem
                  item={referral.info[TypesOfReferrals.AMBASSADOR_REGISTRATION]}
                />
              );
            } else if (TypesOfReferrals.RECRUITMENT in referral.info) {
              return (
                <RecruitmentReferralItem
                  item={referral.info[TypesOfReferrals.RECRUITMENT]}
                />
              );
            } else if (
              TypesOfReferrals.NEAR_CERTIFIED_DEVELOPER in referral.info
            ) {
              return (
                <NCDReferralItem
                  item={
                    referral.info[TypesOfReferrals.NEAR_CERTIFIED_DEVELOPER]
                  }
                />
              );
            }
          })()}
          <VotesDisplay
            accountId={contract.account.accountId}
            isCouncilMember={isCouncilMember}
            votes={referral.votes}
            votes_count={referral.votes_count}
            payoutId={id}
            payoutType={PayoutType.REFERRAL}
          />
        </Box>
      </>
    );
  else if (referral === undefined && !loading) {
    return <Text>Not Found</Text>;
  } else {
    return (
      <Center height="full">
        <Spinner />
      </Center>
    );
  }
};

const ProposalItemPage = withContract(ReferralItem) as LayoutPage;

ProposalItemPage.layout = Layouts.DASHBOARD;

export default ProposalItemPage;
