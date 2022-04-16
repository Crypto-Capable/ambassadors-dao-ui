import React, { useCallback, useEffect, useState } from 'react';
import { Heading, Box, Button, Center } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import loadNearamp from '../../util/load-nearamp';
import { useAuthContext } from '../../context/auth-context';
import { useRouter } from 'next/router';
import { Tabs } from '../../types';
import { captureException } from '@sentry/nextjs';

const RegisterWithNearamp: NextPage = () => {
  const { wallet } = useAuthContext();
  const { replace, query } = useRouter();
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
      // if the URL has query params including the account_id, it means this
      // is a new account and hence needs to be registered with the smart
      if ((query as any).account_id) {
        replace('/register/success');
      } else {
        replace(`/dashboard/${Tabs.PROFILE}`);
      }
    }
  }, [wallet, replace, query]);

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
              <Button onClick={handleClick}>Begin Registration</Button>
            </Center>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RegisterWithNearamp;
