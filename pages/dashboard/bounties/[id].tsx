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
import StatusBadge from '../../../components/status-badge';
import { useContractContext } from '../../../context/contract-context';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  ContentCoordinationItem,
  HackathonCompletionItem,
  MemeCompletionItem,
  WebinarCompletionItem,
} from '../../../components/dashboard/bounties';
import {
  BountyType,
  LayoutPage,
  Payout,
  Tabs,
  TypesOfBounties,
} from '../../../types';
import { PayoutItemDescription } from '../../../components/dashboard/payout-item-description';

const BountyItem: NextPage = () => {
  const { id } = useRouter().query as { id: string };
  const { contract } = useContractContext()!;
  const [bounty, setBounty] = useState<Payout<BountyType> | null>(null);

  useEffect(() => {
    contract.get_bounty({ id: Number(id) }).then(setBounty);

    return () => {
      // whenever the contract or id changes, it sets the proposal to null
      // hence it will show a spinner
      setBounty(null);
    };
  }, [contract, id, setBounty]);
  console.log(bounty);
  const isLoading = bounty === null;
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
          {bounty && <StatusBadge status={bounty.status} />}
        </Flex>
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
        </Box>
      )}
    </>
  );
};

const BountyItemPage = withContract(BountyItem) as LayoutPage;

BountyItemPage.layout = Layouts.DASHBOARD;

export default BountyItemPage;
