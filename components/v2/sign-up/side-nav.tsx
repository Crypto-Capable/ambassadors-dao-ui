import { Box, Flex, Grid, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import {
  IconProps,
  User,
  Buildings,
  DiscordLogo,
  FlagCheckered,
} from 'phosphor-react';
import React from 'react';
import { Forms } from '../../../types/forms';
import SideNavItem from './side-nav-item';

type SideNavContent = {
  label: string;
  labelHelper: string;
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  formType: Forms;
};

const SideNavItems: SideNavContent[] = [
  {
    label: 'About Us',
    labelHelper: 'Personal Details',
    Icon: User,
    formType: Forms.ABOUT,
  },
  {
    label: 'Institution',
    labelHelper: 'Where are you studying?',
    Icon: Buildings,
    formType: Forms.INSTITUTION,
  },
  {
    label: 'Referral',
    labelHelper: 'Received from a voyager',
    Icon: Buildings,
    formType: Forms.REFERRAL,
  },
  {
    label: 'Discord Handle',
    labelHelper: 'Communication Medium',
    Icon: DiscordLogo,
    formType: Forms.DISCORD,
  },
  {
    label: 'Finish Up',
    labelHelper: 'Submit the form',
    Icon: FlagCheckered,
    formType: Forms.FINISH,
  },
];

export const SideNav: React.FC = () => {
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const dir = isMobile ? 'row' : 'column';
  const justify = isMobile ? 'space-evenly' : 'center';
  const w = isMobile ? '100%' : 'auto';
  const h = isMobile ? 'auto' : '100%';
  //
  /*
  return (
    <Box
      h={h}
      w={w}
      py="4"
      _after={{
        content: `""`,
        position: 'absolute',
        width: isMobile ? '100vw' : '1px',
        height: isMobile ? '1px' : '100%',
        // width: '1px',
        // height: '100%',
        backgroundColor: 'white',
        opacity: '0.5',
        right: isMobile ? '0' : '-45.5px',
        top: isMobile ? '100%' : '0',
        bottom: '0',
      }}
      position="relative"
    >
      <VStack w="100%" flexDir={dir} gap="20px" justify={justify} align="end">
        {SideNavItems.map((item) => (
          <SideNavItem key={item.formType} {...item} />
        ))}
      </VStack>
    </Box>
  );
	*/
  return (
    <VStack
      h={h}
      //w={w}
      py="4"
      _after={{
        content: `""`,
        position: 'absolute',
        width: isMobile ? '100vw' : '1px',
        height: isMobile ? '1px' : '100%',
        // width: '1px',
        // height: '100%',
        backgroundColor: 'white',
        opacity: '0.5',
        right: isMobile ? '0' : '-45.5px',
        top: isMobile ? '100%' : '0',
        bottom: '0',
      }}
      position="relative"
      flexDir={dir}
      gap="20px"
      justify={justify}
      align="end"
    >
      {SideNavItems.map((item) => (
        <SideNavItem key={item.formType} {...item} />
      ))}
    </VStack>
  );
};
