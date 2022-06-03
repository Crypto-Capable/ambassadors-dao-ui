import {
  Box,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
  HStack,
} from '@chakra-ui/react';

const colleges = [
  { id: 1, name: 'University of Illinois at Urbana-Champaign' },
  { id: 2, name: 'University of Illinois at Chicago' },
  { id: 3, name: 'University of Illinois at Springfield' },
  { id: 4, name: 'St. Louis University' },
  { id: 5, name: 'Massachusetts Institute of Technology' },
];

export default function JoinOurTeam() {
  return (
    <HStack
      bg="gray.50"
      rounded="xl"
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      alignItems="start"
      justifyContent="space-around"
      h="100vh"
    >
      <Stack maxW="30%" spacing={4}>
        <Heading
          color="gray.800"
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Become a voyager / crew member
          <Text
            as="span"
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            !
          </Text>
        </Heading>
        <Text color="gray.500" fontSize={{ base: 'sm', sm: 'md' }}>
          We’re looking for amazing crew-members just like you! Become a part of
          our rockstar team and help make an impact!
        </Text>
      </Stack>
      <Box as="form" height="100%" overflow="scroll" mt={10}>
        <Stack spacing={4}>
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
          <FormControl isRequired>
            <FormLabel htmlFor="college">College</FormLabel>
            <Select id="college" placeholder="Select College">
              {colleges.map((college) => (
                <option key={college.id}>{college.name}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="discord-username">Discord Username</FormLabel>
            <Input id="discord-username" placeholder="JohnDoe#1234" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="near-wallet">Near Wallet Address</FormLabel>
            <Input id="near-wallet" placeholder="johndoe.near" />
            <FormHelperText>
              Please provide a valid near wallet address
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="near-wallet">Near Wallet Address</FormLabel>
            <Input id="near-wallet" placeholder="johndoe.near" />
            <FormHelperText>
              Please provide a valid near wallet address
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="near-wallet">Near Wallet Address</FormLabel>
            <Input id="near-wallet" placeholder="johndoe.near" />
            <FormHelperText>
              Please provide a valid near wallet address
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="referral">Referral Code</FormLabel>
            <Input id="referral" placeholder="1234abcd" />
            <FormHelperText>
              In case you&apos;ve received a referral code from a friend, please
              enter
            </FormHelperText>
          </FormControl>
        </Stack>
        <Button
          fontFamily="heading"
          mt={8}
          w="full"
          bgGradient="linear(to-r, red.400,pink.400)"
          color="white"
          _hover={{
            bgGradient: 'linear(to-r, red.400,pink.400)',
            boxShadow: 'xl',
          }}
        >
          Submit
        </Button>
      </Box>
      form
    </HStack>
  );
}
