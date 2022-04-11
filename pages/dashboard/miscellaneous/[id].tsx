import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import StatusBadge from '../../../components/status-badge';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import { PayoutItemDescription } from '../../../components/dashboard/payout-item-description';
import { CABonusItem } from '../../../components/dashboard/miscellaneous/ca-bonus-item';
import { CampusSigningMOUItem } from '../../../components/dashboard/miscellaneous/campus-signing-mou-item';
import { ContentCreationMiscellaneousItem } from '../../../components/dashboard/miscellaneous/content-creation-bounty-item';
import VotesDisplay from '../../../components/dashboard/voting';
import RemovePayout from '../../../components/dashboard/remove-payout';
import {
  LayoutPage,
  PayoutType,
  TypesOfMiscellaneous,
  WithContractChildProps,
} from '../../../types';
import { useMiscellaneous } from '../../../hooks/payout-hooks';

const MiscellaneousItem: NextPage<WithContractChildProps> = ({
  contract,
  isCouncilMember,
}) => {
  const { id } = useRouter().query as { id: string };
  const { data: misc, loading } = useMiscellaneous({
    contract,
    id: Number(id),
  });
  if (misc !== undefined)
    return (
      <>
        <Head>
          <title>All Proposals</title>
        </Head>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex flexDir={'column'}>
            <Heading mr={2} as="h2" fontSize="1.75rem">
              Viewing miscellaneous payout {id}
            </Heading>
            {misc && (
              <Box>
                <StatusBadge status={misc.status} />
              </Box>
            )}
          </Flex>
          {contract.account.accountId === misc?.proposer && (
            <RemovePayout payoutId={id} payoutType={PayoutType.MISCELLANEOUS} />
          )}
        </Flex>
        <Box mt="8">
          <PayoutItemDescription
            proposer={misc.proposer}
            description={misc.description}
          />
          {(() => {
            if (TypesOfMiscellaneous.CAMPUS_AMBASSADOR_BONUS in misc.info) {
              return (
                <CABonusItem
                  item={misc.info[TypesOfMiscellaneous.CAMPUS_AMBASSADOR_BONUS]}
                />
              );
            } else if (TypesOfMiscellaneous.CAMPUS_SIGNING_MOU in misc.info) {
              return (
                <CampusSigningMOUItem
                  item={misc.info[TypesOfMiscellaneous.CAMPUS_SIGNING_MOU]}
                />
              );
            } else if (
              TypesOfMiscellaneous.CONTENT_CREATION_BOUNTY in misc.info
            ) {
              return (
                <ContentCreationMiscellaneousItem
                  item={misc.info[TypesOfMiscellaneous.CONTENT_CREATION_BOUNTY]}
                />
              );
            }
          })()}
          <VotesDisplay
            accountId={contract.account.accountId}
            isCouncilMember={isCouncilMember}
            votes={misc.votes}
            votes_count={misc.votes_count}
            payoutId={id}
            payoutType={PayoutType.MISCELLANEOUS}
          />
        </Box>
      </>
    );
  else if (misc === undefined && !loading) {
    return <Text>Not Found</Text>;
  } else {
    return (
      <Center height="full">
        <Spinner />
      </Center>
    );
  }
};

const MiscellaneousItemPage = withContract(MiscellaneousItem) as LayoutPage;

MiscellaneousItemPage.layout = Layouts.DASHBOARD;

export default MiscellaneousItemPage;
