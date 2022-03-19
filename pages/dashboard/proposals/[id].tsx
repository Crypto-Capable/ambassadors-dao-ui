import {
  Box,
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Plus } from 'phosphor-react';
import React from 'react';
import StatusBadge from '../../../components/status-badge';
import { Layouts } from '../../../layouts';
import { LayoutPage, Tabs } from '../../../types';

const ProposalItem: LayoutPage = () => {
  const { id } = useRouter().query as { id: string };

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
      <Flex mt="8" alignItems="center" justifyContent="space-between">
        <Box>
          <Text display="inline-block">{stub[id].description}</Text>
        </Box>
        <StatusBadge status={stub[id].status} />
      </Flex>
    </>
  );
};

ProposalItem.layout = Layouts.DASHBOARD;

export default ProposalItem;
