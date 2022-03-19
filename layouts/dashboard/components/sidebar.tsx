import { Button, Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useAuthContext } from '../../../context/auth-context';
import { Tabs } from '../../../types';

import NavLink from './nav-link';

const linksMap = {
  [Tabs.PROPOSALS]: `/dashboard/${Tabs.PROPOSALS}`,
  [Tabs.BOUNTIES]: `/dashboard/${Tabs.BOUNTIES}`,
  [Tabs.REFERRALS]: `/dashboard/${Tabs.REFERRALS}`,
  [Tabs.MISCELLANEOUS]: `/dashboard/${Tabs.MISCELLANEOUS}`,
};

const Sidebar = () => {
  const { pathname } = useRouter();
  const { signOut } = useAuthContext();

  const activeTabName = useMemo(() => pathname.split('/')[2], [pathname]);

  return (
    <Flex
      borderRight="1px"
      borderColor="gray.300"
      width="280px"
      padding="1rem"
      paddingTop="1.5rem"
      bgImage="url('/hero-bg.jpg')"
      bgSize="cover"
      backdropFilter="blur(5px)"
      flexDirection="column"
    >
      <Heading as="h1">CA Dashboard</Heading>
      <Flex as="nav" flexDirection="column" mt="16" experimental_spaceY="2">
        <NavLink
          href={linksMap[Tabs.PROPOSALS]}
          active={activeTabName === Tabs.PROPOSALS}
        >
          Proposals
        </NavLink>
        <NavLink
          href={linksMap[Tabs.BOUNTIES]}
          active={activeTabName === Tabs.BOUNTIES}
        >
          Bounties
        </NavLink>
        <NavLink
          href={linksMap[Tabs.REFERRALS]}
          active={activeTabName === Tabs.REFERRALS}
        >
          Referrals
        </NavLink>
        <NavLink
          href={linksMap[Tabs.MISCELLANEOUS]}
          active={activeTabName === Tabs.MISCELLANEOUS}
        >
          Miscellaneous
        </NavLink>
      </Flex>
      <Button
        mt="auto"
        onClick={signOut}
        variant="outline"
        bg="transparent"
        color="white"
        shadow="lg"
        _hover={{
          shadow: 'xl',
        }}
        _active={{
          shadow: 'md',
          bg: 'transparent',
        }}
        transition="all 0.2s ease"
      >
        Sign Out
      </Button>
    </Flex>
  );
};

export default Sidebar;
