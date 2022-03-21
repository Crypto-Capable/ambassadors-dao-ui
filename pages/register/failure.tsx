import { Center, Text, Link as ChakraLink, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const RegistrationFailurePage = () => {
  const [timeLeft, setTimeLeft] = useState(8);
  const { replace } = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t == 0) {
          replace('/');
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [setTimeLeft, replace]);

  return (
    <Center
      minHeight="100vh"
      minWidth="100vw"
      bgImage="url('/hero-bg.jpg')"
      bgSize="cover"
      backdropFilter="blur(5px)"
      flexDirection="column"
      padding="2rem"
    >
      <Heading>Seems like you have failed your login/registration</Heading>
      <Text mt="4">
        Redirecting you back{' '}
        <Link href="/" passHref>
          <ChakraLink textDecoration="underline">home</ChakraLink>
        </Link>{' '}
        in {timeLeft}s.
      </Text>
    </Center>
  );
};

export default RegistrationFailurePage;
