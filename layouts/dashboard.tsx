import { Box, Flex, Heading, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <Flex height="100vh" width="100vw">
      <Box
        borderRight="1px"
        borderColor="gray.300"
        width="280px"
        padding="1rem"
      >
        <Heading>CA Dashboard</Heading>
        <Flex flexDirection="column" mt="16">
          <Link href="/dashboard/proposals" passHref>
            <ChakraLink
              rounded="md"
              textDecoration="none"
              padding="6px 8px"
              fontSize="1.1rem"
              _hover={{
                bgColor: 'gray.200',
              }}
            >
              Proposals
            </ChakraLink>
          </Link>
        </Flex>
      </Box>
      <Box padding="2rem 2rem 0 2rem">{children}</Box>
    </Flex>
  );
};

export default DashboardLayout;
