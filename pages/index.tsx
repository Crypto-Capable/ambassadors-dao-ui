import { Button, Center, Heading, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAuthContext } from '../context/auth-context';

const Home: NextPage = () => {
  const { signIn } = useAuthContext();

  return (
    <>
      <Head>
        <title>Crypto Capable Ambassador&apos;s DAO</title>
      </Head>
      <Center
        minHeight="100vh"
        minWidth="100vw"
        bgImage="url('/hero-bg.jpg')"
        bgSize="cover"
        backdropFilter="blur(5px)"
        flexDirection="column"
        padding="2rem"
      >
        <Heading textAlign="center">
          Crypto Capable Ambassadors&apos; DAO
        </Heading>
        <Text mt="8" fontSize="2xl" textAlign="center" maxWidth="70vw">
          Become a part of Crypto Capable&apos;s Ambassadors program and spread
          awareness about the NEAR protocol while making some NEAR for yourself!
        </Text>
        <Button
          variant="outline"
          onClick={signIn}
          mt="12"
          bg="white"
          shadow="lg"
        >
          Sign in with Near Wallet
        </Button>
      </Center>
    </>
  );
};

export default Home;
