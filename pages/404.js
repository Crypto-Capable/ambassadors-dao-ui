import NextErrorComponent from 'next/error';

import Head from 'next/head';
import {
  Button,
  Center,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';

const Page404 = (statusCode) => {
  return (
    <>
      <Head>
        <title>Something Went Wrong...</title>
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
          Whoops! The webpage you are looking for does not exist!
        </Heading>
        <Text
          mt="8"
          fontSize={['md', 'lg', '2xl']}
          textAlign="center"
          maxWidth="70vw"
        >
          Please reach out to tech@cryptocapable.community for further support
        </Text>
        <Flex mt="12" flexDirection={['column', 'row']}>
          <Link href="/" passHref>
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
              Back to homepage
            </Button>
          </Link>
        </Flex>
      </Center>
    </>
  );
};

export default Page404;
