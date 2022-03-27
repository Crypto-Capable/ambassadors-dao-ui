import React, { useEffect, useState } from 'react';
import { Heading, Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import initNearamp from '../../util/init-nearamp';

const RegisterWithNearamp: NextPage = () => {
  useEffect(() => {
    initNearamp(
      window,
      document,
      'script',
      'NR',
      'https://sdk.testnet.nearamp.dev/nearamp.js'
    );

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
      .catch(console.log);
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
          <Box marginTop="8" id="nearamp-widget"></Box>
        </Box>
      </Box>
    </>
  );
};

export default RegisterWithNearamp;
