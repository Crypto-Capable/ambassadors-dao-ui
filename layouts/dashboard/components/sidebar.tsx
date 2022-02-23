import { Box, Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import NavLink from './nav-link';

enum Tabs {
  PROPOSALS = 'proposals',
  BOUNTIES = 'bounties',
  REFERRALS = 'referrals',
  MISCELLANEOUS = 'miscellaneous',
}

const linksMap = {
  [Tabs.PROPOSALS]: `/dashboard/${Tabs.PROPOSALS}`,
  [Tabs.BOUNTIES]: `/dashboard/${Tabs.BOUNTIES}`,
  [Tabs.REFERRALS]: `/dashboard/${Tabs.REFERRALS}`,
  [Tabs.MISCELLANEOUS]: `/dashboard/${Tabs.MISCELLANEOUS}`,
};

const Sidebar = () => {
  const { pathname } = useRouter();
  const activeTabName = useMemo(() => pathname.split('/').pop(), [pathname]);

  return (
    <Box
      borderRight="1px"
      borderColor="gray.300"
      width="280px"
      padding="1rem"
      bgImage="url('/hero-bg.jpg')"
      bgSize="cover"
      backdropFilter="blur(5px)"
    >
      <Heading>CA Dashboard</Heading>
      <Flex flexDirection="column" mt="16" experimental_spaceY="2">
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
    </Box>
  );
};

export default Sidebar;
