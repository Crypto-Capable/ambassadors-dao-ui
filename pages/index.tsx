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
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthContext } from '../context/auth-context';
import { Tabs } from '../types';

const Home: NextPage = () => {
  const { signIn, wallet } = useAuthContext();
  const { replace } = useRouter();

  useEffect(() => {
    if (!wallet) return;

    if (wallet.isSignedIn()) replace(`/dashboard/${Tabs.PROPOSALS}`);
  }, [wallet, replace]);

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
        padding={['1rem', '2rem']}
      >
        <Heading textAlign="center" fontSize={['xl', '2xl', '4xl']}>
          Crypto Capable Ambassadors&apos; DAO
        </Heading>
        <Text
          mt="8"
          fontSize={['md', 'lg', '2xl']}
          textAlign="center"
          maxWidth="70vw"
        >
          Become a part of Crypto Capable&apos;s Ambassadors program and spread
          awareness about the NEAR protocol while making some NEAR for yourself!
        </Text>
        <Flex mt="12" flexDirection={['column', 'row']}>
          <Link href="/register/with-nearamp" passHref>
            <Button
              marginRight={['0', '8']}
              marginBottom={['4', '0']}
              as={ChakraLink}
              variant="outline"
              bg="white"
              shadow="lg"
              _hover={{
                shadow: 'xl',
              }}
              _active={{
                shadow: 'md',
              }}
              transition="all 0.2s ease"
            >
              Create a Wallet with NEARamp
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={signIn}
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
            Sign In with Near Wallet
          </Button>
        </Flex>
      </Center>
    </>
  );
};

export default Home;
