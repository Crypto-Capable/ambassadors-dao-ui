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
import { useContractContext } from '../../../context/contract-context';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  LayoutPage,
  Payout,
  ReferralType,
  Tabs,
  TypesOfProposals,
} from '../../../types';

const ReferralItem: NextPage = () => {
  const { id } = useRouter().query as { id: string };
  const { contract } = useContractContext()!;
  const [referral, setReferral] = useState<Payout<ReferralType> | null>(null);

  useEffect(() => {
    contract.get_referral({ id: Number(id) }).then(setReferral);

    return () => {
      // whenever the contract or id changes, it sets the proposal to null
      // hence it will show a spinner
      setReferral(null);
    };
  }, [contract, id, setReferral]);

  console.log(referral);
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
          <Heading as="h3" fontSize="1.25rem">
            By {referral.proposer}
          </Heading>
          <Text mt={2}>{referral.description}</Text>
          {(() => {
            // FIXME: handle individual cases and render components accordingly
          })()}
        </Box>
      )}
    </>
  );
};

const ProposalItemPage = withContract(ReferralItem) as LayoutPage;
ProposalItemPage.layout = Layouts.DASHBOARD;
export default ProposalItemPage;
