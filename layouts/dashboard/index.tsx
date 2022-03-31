import {
  Box,
  Flex,
  useMediaQuery,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { List } from 'phosphor-react';
import React, { useRef } from 'react';
import withProtection from '../../hoc/with-protection';
import Sidebar from './components/sidebar';

const DashboardLayout: React.FC = ({ children }) => {
  const [isLargerThan480] = useMediaQuery('(min-width: 520px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <Flex height="100vh" width="100vw">
      {isLargerThan480 && <Sidebar />}
      <Box padding="2rem" flex="1" maxHeight="100vh" overflowY="auto">
        {children}
      </Box>
      {!isLargerThan480 && (
        <>
          <IconButton
            ref={btnRef}
            position="fixed"
            right="5"
            bottom="5"
            onClick={onOpen}
            aria-label="Sidebar"
            icon={<List />}
          />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="full"
          >
            <DrawerOverlay />
            <DrawerContent>
              <Sidebar />
            </DrawerContent>
          </Drawer>
        </>
      )}
    </Flex>
  );
};

const ProtectedDashboardLayout = withProtection(DashboardLayout);

export default ProtectedDashboardLayout;
