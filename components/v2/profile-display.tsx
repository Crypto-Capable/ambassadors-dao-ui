import { Tag, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { Envelope, GithubLogo, Info } from 'phosphor-react';

const ProfileDisplay: React.FC = ({ children }) => {
  return (
    <HStack my="100px" mx="200px" gap="10" align="strech">
      <Image src="https://picsum.photos/200/200/?blur" alt="Profile Image" />
      <VStack align="strech" justify={'space-between'}>
        <HStack justifyContent={'space-between'}>
          <HStack gap="2" align="end">
            <VStack>
              <Heading as="h3">John Doe </Heading>
            </VStack>
            <Text color="gray.500"> Machine General ID</Text>
            <HStack gap="3">
              <Tag fontSize="1.5em" colorScheme={'blue'}>
                Tag1
              </Tag>
              <Tag fontSize="1.5em" colorScheme={'green'}>
                Tag2
              </Tag>
              <Tag fontSize="1.5em" colorScheme={'yellow'} borderRadius="5px">
                Tag3
              </Tag>
            </HStack>
          </HStack>
          {children}
        </HStack>
        <HStack gap="5" color="gray.400">
          <HStack>
            <Info size="20px" />
            <Text> id.crew_001</Text>
          </HStack>
          <HStack>
            <Envelope size="20px" />
            <Text> john.doe@gmail.com</Text>
          </HStack>
          <HStack>
            <GithubLogo size="20px" />
            <Text> github-username</Text>
          </HStack>
        </HStack>
        <Text>
          Display information tweet style Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Donec sit amet massa nec augue mattis
          aliquam. Proin purus metus, hendrerit eget lacinia in, suscipit sit
          amet enim. Cras cursus tellus a sem eleifend, ut venenatis magna
          dignissim. Aliquam velit nulla, ultrices nec mi a, scelerisque egestas
          quam. Donec pellentesque iaculis lectus, et fermentum mauris
        </Text>
      </VStack>
    </HStack>
  );
};
export default ProfileDisplay;
