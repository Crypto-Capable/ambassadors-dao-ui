import {
  Box,
  Flex,
  HStack,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { IconProps } from 'phosphor-react';
import React from 'react';
import { FormValuesAtom } from '../../../atoms/form';
import { Forms } from '../../../types/forms';

interface SideNavItemProps {
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  formType: Forms;
  label: string;
  labelHelper: string;
}

const colors = ['green.300', 'blue.300'];
const SideNavItem: React.FC<SideNavItemProps> = ({
  Icon,
  formType,
  label,
  labelHelper,
}) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { currentForm } = useAtomValue(FormValuesAtom);
  const active = currentForm === formType;
  const passed = currentForm > formType;
  let color = 'white';
  if (active) color = colors[1];
  else if (passed) color = colors[0];
  return (
    <Flex
      color="white"
      align="center"
      justify={isMobile ? 'center' : 'end'}
      w="100%"
      gap="20px"
    >
      <Flex
        pl="10px"
        flexDir="column"
        align="end"
        gap="0"
        columnGap="0"
        justifyContent="space-around"
        display={{ base: 'none', md: 'flex' }}
      >
        <Text fontSize="lg" fontWeight="400" fontFamily="Work Sans">
          {label}
        </Text>
        <Text
          textAlign="end"
          mt="-2px"
          fontSize="sm"
          fontWeight="300"
          fontFamily="Work Sans"
        >
          {labelHelper}
        </Text>
      </Flex>

      <Box
        pos="relative"
        _after={{
          content: `""`,
          position: 'absolute',
          width: '10px',
          height: '10px',
          backgroundColor: active ? '#4097D0' : 'black',
          zIndex: 2,
          top: isMobile ? '130%' : '40%',
          right: isMobile ? '38%' : '-50px',
          borderRadius: '100px',
          borderWidth: '1px',
          borderColor: 'rgba(255, 255, 255, 0.5)',
        }}
        borderRadius="50px"
        bgColor={color}
        p="5px"
        color="black"
      >
        <Icon size="24" />
      </Box>
    </Flex>
  );
};

export default SideNavItem;
