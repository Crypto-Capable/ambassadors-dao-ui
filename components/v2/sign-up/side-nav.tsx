import { VStack } from '@chakra-ui/react';
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
  return (
    <VStack
      minW="226px"
      as="aside"
      h="auto"
      py={{ base: '4', md: '55px' }}
      _after={{
        content: `""`,
        position: 'absolute',
        width: { base: '100vw', md: '1px' },
        height: { base: '1px', md: '100%' },

        backgroundColor: 'white',
        opacity: '0.5',
        right: { base: '0', md: '-45.5px' },
        top: { base: '100%', md: '0' },
        bottom: '0',
      }}
      position="relative"
      flexDir={{ base: 'row', md: 'column' }}
      gap="20px"
      justify={{ base: 'space-evenly', md: 'start' }}
      align="end"
    >
      {SideNavItems.map((item) => (
        <SideNavItem key={item.formType} {...item} />
      ))}
    </VStack>
  );
};
