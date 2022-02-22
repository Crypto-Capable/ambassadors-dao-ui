import React from 'react';
import Head from 'next/head';
import withProtection from '../hoc/with-protection';

const Prot: React.FC = () => {
  return (
    <>
      <Head>
        <title>Protected Route</title>
      </Head>
      <div>Prot</div>
    </>
  );
};

export default withProtection(Prot);
