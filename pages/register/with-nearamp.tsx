import React, { useCallback, useEffect, useState } from 'react';
import { Heading, Box, Button, Center } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { captureException } from '@sentry/nextjs';

import loadNearamp from '../../util/load-nearamp';
import { useAuthContext } from '../../context/auth-context';
import { Tabs } from '../../types';

const RegisterWithNearamp: NextPage = () => {
  const { wallet } = useAuthContext();
  const { replace } = useRouter();
  const [started, setStarted] = useState<boolean>(false);

  const startRegistration = useCallback(() => {
    const getToken = async () => {
      const res = await fetch('/api/sign-nearamp-jwt');
      return await res.json();
    };

    getToken()
      .then((token) =>
        (window as any).NR('init', {
          developerID: process.env.NEXT_PUBLIC_CONTRACT_NAME,
          grantToken: token,
          targetElement: 'nearamp-widget',
          loginConfig: {
            contractId: process.env.NEXT_PUBLIC_CONTRACT_NAME,
            redirectUrl: `${process.env.NEXT_PUBLIC_HOST}/register/success`,
          },
        })
      )
      .catch(captureException);
  }, []);

  const handleClick = useCallback(() => {
    setStarted(true);
    startRegistration();
  }, [setStarted, startRegistration]);

  useEffect(() => {
    if (!wallet) return;

    if (wallet.isSignedIn()) {
      replace(`/dashboard/${Tabs.PROFILE}`);
    }
  }, [wallet, replace]);

  useEffect(() => {
    if (!(window as any).NR) {
      loadNearamp(
        window,
        document,
        'script',
        'NR',
        'https://sdk.testnet.nearamp.dev/nearamp.js'
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Register with Nearamp and get a Pre-Funded Wallet.</title>
      </Head>
      <Box
        padding="1rem"
        height="100vh"
        bgImage="url('/hero-bg.jpg')"
        bgSize="cover"
        backdropFilter="blur(5px)"
        flexDirection="column"
        alignItems="stretch"
      >
        <Box
          height="full"
          overflowY="auto"
          bg="white"
          rounded="md"
          border="1px"
          padding="1rem"
        >
          <Heading textAlign="center" fontSize="1.5rem">
            Register using Nearamp with a pre-funded wallet!
          </Heading>
          {started ? (
            <Box marginTop="8" id="nearamp-widget"></Box>
          ) : (
            <Center height="full">
              <Button onClick={handleClick}>Create Wallet</Button>
            </Center>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RegisterWithNearamp;
