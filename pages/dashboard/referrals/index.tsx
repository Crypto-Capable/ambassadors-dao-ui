import { Box, Button, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { CreateNewButton } from '../../../components/dashboard/create-new-button';
import { PayoutListItem } from '../../../components/dashboard/payout-list-item';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import {
  LayoutPage,
  Payout,
  ReferralType,
  Tabs,
  WithContractChildProps,
} from '../../../types';

const limit = 12;

const ReferralsList: NextPage<WithContractChildProps> = ({ contract }) => {
  const [page, setPage] = useState(1);
  const [referrals, setReferrals] = useState<Payout<ReferralType>[] | null>(
    null
  );
  useEffect(() => {
    contract
      .get_all_referrals({
        from_index: (page - 1) * limit,
        limit: limit,
      })
      .then(setReferrals)
      .catch(console.log);

    return () => {
      setReferrals(null);
    };
  }, [contract, page]);

  return (
    <>
      <Head>
        <title>All Referrals</title>
      </Head>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h2" fontSize="1.75rem">
          Viewing all referrals
        </Heading>
        <CreateNewButton href={`/dashboard/${Tabs.REFERRALS}/new`} />
      </Flex>
      <Box mt="8" experimental_spaceY="4">
        {referrals === null ? (
          <Center>
            <Spinner />
          </Center>
        ) : referrals.length === 0 ? (
          'No referrals to see!'
        ) : (
          referrals.map((p) => (
            <PayoutListItem
              key={p.id}
              {...p}
              link={`/dashboard/${Tabs.REFERRALS}/${p.id}`}
            />
          ))
        )}
      </Box>
      {referrals?.length == limit && (
        <Flex alignItems="center" justifyContent="space-between">
          {page > 1 && (
            <Button onClick={() => setPage((p) => p + 1)}>Show Next</Button>
          )}
          <Button onClick={() => setPage((p) => p + 1)}>Show Next</Button>
        </Flex>
      )}
    </>
  );
};

const ProposalsListPage = withContract(ReferralsList) as LayoutPage;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
