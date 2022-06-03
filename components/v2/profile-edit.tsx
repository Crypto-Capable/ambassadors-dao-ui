import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { Stack } from 'phosphor-react';
import ProfileTags from './profile-tags';

const ProfileEdit: React.FC = ({ children }) => {
  return (
    <>
      <VStack align="start" w="50%" m="auto" my="100px">
        <HStack>
          <Image
            src="https://picsum.photos/300/200/?blur"
            alt="Profile Image"
          />
          <Input type="file" />
        </HStack>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            placeholder="John Doe"
            id="name"
            type="text"
            bg="gray.100"
            color="gray.500"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            placeholder="John Doe"
            type="email"
            id="email"
            bg="gray.100"
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
