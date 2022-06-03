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
import { useEffect, useState } from 'react';
import ProfileTags from './profile-tags';

const ProfileEdit: React.FC = ({ children }) => {
  const [image, setImage] = useState<File>();
  const [imgURL, setImgURL] = useState<string>();
  useEffect(() => {
    if (image) setImgURL(URL.createObjectURL(image));
  }, [image]);
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
          <Input
            id="image-input"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
          <FormLabel htmlFor="image-input">
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
                <Camera z="5" color="white" size={32}>
                  <Input type="file" />
                </Camera>
              </Box>
            </Tooltip>
          </FormLabel>
        </Flex>
        {imgURL && <Image src={imgURL} alt="img" />}
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
