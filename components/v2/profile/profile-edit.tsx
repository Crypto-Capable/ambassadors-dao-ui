import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { Camera } from 'phosphor-react';
import { useEffect, useState } from 'react';
import ImageEdit from './profile-image-edit';
import ProfileTags from './profile-tags';

const ProfileEdit: React.FC = ({ children }) => {
  return (
    <>
      <VStack align="start" w="50%" m="auto" my="100px">
        <Flex m="auto">
          <ImageEdit />
        </Flex>

        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            placeholder="John Doe"
            id="name"
            type="text"
            color="gray.500"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            placeholder="John Doe"
            type="email"
            id="email"
            color="gray.500"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="discord-username">Discord Username</FormLabel>
          <Input id="discord-username" placeholder="JohnDoe#1234" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="other">Other Media Username</FormLabel>
          <Input id="other" placeholder="OtherMediaUsername" />
        </FormControl>
        <ProfileTags />
        {children}
      </VStack>
    </>
  );
};

export default ProfileEdit;
