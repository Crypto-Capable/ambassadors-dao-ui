import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link as ChakraLink,
  Spinner,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Plus } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { PayoutItemDescription } from '../../../components/dashboard/payout-item-description';
import {
  AmbassadorReferralItem,
  RecruitmentReferralItem,
  NCDReferralItem,
} from '../../../components/dashboard/referrals/index';
import VotesDisplay from '../../../components/dashboard/voting';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  WithContractChildProps,
  LayoutPage,
  Payout,
  ReferralType,
  Tabs,
  TypesOfReferrals,
  PayoutType,
} from '../../../types';

const ReferralItem: NextPage<WithContractChildProps> = ({
  contract,
  isCouncilMember,
}) => {
  const { id } = useRouter().query as { id: string };
  const [referral, setReferral] = useState<Payout<ReferralType> | null>(null);

  useEffect(() => {
    contract.get_referral({ id: Number(id) }).then(setReferral);

    return () => {
      // whenever the contract or id changes, it sets the proposal to null
      // hence it will show a spinner
      setReferral(null);
    };
  }, [contract, id, setReferral]);

  const isLoading = referral === null;

  return (
    <>
      <Head>
        <title>All Proposals</title>
      </Head>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h2" fontSize="1.75rem">
          Viewing proposal {id}
        </Heading>
        <Link href={`/dashboard/${Tabs.REFERRALS}/new`} passHref>
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
      )}
    </>
  );
};

const ProposalItemPage = withContract(ReferralItem) as LayoutPage;

ProposalItemPage.layout = Layouts.DASHBOARD;

export default ProposalItemPage;
