import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
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
  MiscellaneousType,
  Payout,
  PayoutType,
  TypesOfMiscellaneous,
  WithContractChildProps,
} from '../../../types';

const MiscellaneousItem: NextPage<WithContractChildProps> = ({
  contract,
  isCouncilMember,
}) => {
  const { id } = useRouter().query as { id: string };
  const [misc, setMisc] = useState<Payout<MiscellaneousType> | null>(null);

  useEffect(() => {
    contract.get_miscellaneous({ id: Number(id) }).then(setMisc);

    return () => {
      setMisc(null);
    };
  }, [contract, id, setMisc]);

  const isLoading = misc === null;

  return (
    <>
      <Head>
        <title>All Proposals</title>
      </Head>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Heading mr={2} as="h2" fontSize="1.75rem">
            Viewing proposal {id}
          </Heading>
          {misc && <StatusBadge status={misc.status} />}
        </Flex>
        {contract.account.accountId === misc?.proposer && (
          <RemovePayout payoutId={id} payoutType={PayoutType.MISCELLANEOUS} />
        )}
      </Flex>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
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
      )}
    </>
  );
};

const MiscellaneousItemPage = withContract(MiscellaneousItem) as LayoutPage;

MiscellaneousItemPage.layout = Layouts.DASHBOARD;

export default MiscellaneousItemPage;
