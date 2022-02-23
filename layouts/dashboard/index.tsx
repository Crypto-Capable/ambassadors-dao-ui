import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Sidebar from './components/sidebar';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <Flex height="100vh" width="100vw">
      <Sidebar />
      <Box padding="2rem 2rem 0 2rem">{children}</Box>
    </Flex>
  );
};

export default DashboardLayout;
