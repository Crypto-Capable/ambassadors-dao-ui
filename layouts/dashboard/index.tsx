import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import withProtection from '../../hoc/with-protection';
import Sidebar from './components/sidebar';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <Flex height="100vh" width="100vw">
      <Sidebar />
      <Box padding="2rem" flex="1" maxHeight="100vh" overflowY="auto">
        {children}
      </Box>
    </Flex>
  );
};

const ProtectedDashboardLayout = withProtection(DashboardLayout);

export default ProtectedDashboardLayout;
