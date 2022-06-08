import { Box, Flex, Grid, Text, VStack } from '@chakra-ui/react';
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
    labelHelper: 'Received from a friend or a voyager',
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
  //
  return (
    <Flex w="100%" h="100%" justify="start" ml="5">
      <Box
        h="100%"
        pt="4"
        _after={{
          content: `""`,
          position: 'absolute',
          width: '1px',
          backgroundColor: 'white',
          opacity: '0.5',
          top: '0',
          bottom: '0',
          right: '-45.5px',
        }}
        position="relative"
      >
        <VStack gap="20px" justify={'start'} align="end">
          {SideNavItems.map((item) => (
            <SideNavItem key={item.formType} {...item} />
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};
