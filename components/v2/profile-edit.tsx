import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { Camera } from 'phosphor-react';
import ProfileTags from './profile-tags';

const ProfileEdit: React.FC = ({ children }) => {
  return (
    <>
      <VStack align="start" w="50%" m="auto" my="100px">
        <Flex
          h="200px"
          w="200px"
          m="auto"
          backgroundImage="url('https://picsum.photos/200/200/?blur')"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          align="center"
          justify="center"
        >
          <Tooltip label="Add image">
            <Box
              borderRadius="100px"
              _hover={{
                cursor: 'pointer',
                padding: '12px',
                bgColor: 'blackAlpha.600',
              }}
              bgColor="blackAlpha.800"
              opacity="0.5"
              padding="10px"
            >
              <Camera z="5" color="white" size={32} />
            </Box>
          </Tooltip>
        </Flex>

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
