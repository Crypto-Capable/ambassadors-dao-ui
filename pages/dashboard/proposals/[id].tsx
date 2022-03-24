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
import { LayoutPage, Payout, ProposalType, Tabs } from '../../../types';

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
  console.log(proposal);
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
        <Flex mt="8" alignItems="center" justifyContent="space-between">
          <Heading as="h3" fontSize="1.25rem">
            By {proposal.proposer}
          </Heading>
        </Flex>
      )}
    </>
  );
};

const ProposalItemPage = withContract(ProposalItem) as LayoutPage;
ProposalItemPage.layout = Layouts.DASHBOARD;
export default ProposalItemPage;
