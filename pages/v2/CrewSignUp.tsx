import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { DisplayForm } from '../../components/v2/sign-up/display-form';

const CrewSignUp: NextPage = () => (
  <Box minH="100vh" bgColor="black" color="white">
    <Box
      as="header"
      bgImage="url('/CrewSignUpBg.png')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      height="25vh"
    >
      {/* Box to apply gradient */}
      <Box
        h="100%"
        bgGradient="linear(357.84deg, #070606 -3.45%, rgba(217, 217, 217, 0) 98.29%)"
      >
        <Flex
          h="100%"
          flexDir="column"
          maxW="min(80vw, 768px)"
          justify="flex-end"
          margin="auto"
          pb="4"
        >
          <Heading as="h1">Crew Signup</Heading>
          <Text>Fill the form to join as a Member in the Community </Text>
        </Flex>
      </Box>
    </Box>

    {/* Primary Form Component */}
    <DisplayForm />
  </Box>
);

export default CrewSignUp;
