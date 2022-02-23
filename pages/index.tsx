import {
  Button,
  Center,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
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
        <Flex mt="12">
          <Button
            variant="outline"
            onClick={signIn}
            bg="white"
            shadow="lg"
            marginRight="8"
            _hover={{
              shadow: 'xl',
            }}
            _active={{
              shadow: 'md',
            }}
            transition="all 0.2s ease"
          >
            Sign in with Near Wallet
          </Button>
          <Link href="/dashboard/proposals" passHref>
            <Button
              as={ChakraLink}
              variant="outline"
              bg="transparent"
              color="white"
              shadow="lg"
              _hover={{
                shadow: 'xl',
              }}
              _active={{
                shadow: 'md',
                bg: 'transparent',
              }}
              transition="all 0.2s ease"
            >
              Go to CA Dashboard
            </Button>
          </Link>
        </Flex>
      </Center>
    </>
  );
};

export default Home;
