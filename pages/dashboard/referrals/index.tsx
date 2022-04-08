import { Box, Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { CreateNewButton } from '../../../components/dashboard/create-new-button';
import { PayoutListItem } from '../../../components/dashboard/payout-list-item';
import withContract from '../../../hoc/with-contract';
import { Layouts } from '../../../layouts';
import { pageItemsLimit as limit } from '../../../util/constants';
import {
  LayoutPage,
  PayoutListProps,
  Tabs,
  WithContractChildProps,
} from '../../../types';
import { useReferrals } from '../../../hooks/payout-hooks';

/**
 * This is a list of referrals
 *
 * The component makes use of useReferrals hook
 */
const ReferralsList: React.FC<PayoutListProps> = ({
  contract,
  from,
  limit,
}) => {
  const { data, loading, error } = useReferrals({ contract, from, limit });
  console.log(data);
  if (data !== undefined) {
    return data.length === 0 ? (
      <Text>No referrals to view!</Text>
    ) : (
      <Box experimental_spaceY="4" mt="8">
        {data.map((p) => (
          <PayoutListItem
            key={p.id}
            description={p.description}
            status={p.status}
            proposer={p.proposer}
            id={p.id}
            link={`/dashboard/${Tabs.REFERRALS}/${p.id}`}
          />
        ))}
      </Box>
    );
  } else if (!loading && error) {
    return <Text>Not Found</Text>;
  } else {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }
};

const ReferralsPage: NextPage<WithContractChildProps> = ({ contract }) => {
  const [page, setPage] = useState(1);
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
      <ReferralsList
        contract={contract}
        from={(page - 1) * limit + 1}
        limit={limit}
      />
      {/*referrals?.length == limit && (
        <Flex alignItems="center" justifyContent="space-between">
          {page > 1 && (
            <Button onClick={() => setPage((p) => p + 1)}>Show Next</Button>
          )}
          <Button onClick={() => setPage((p) => p + 1)}>Show Next</Button>
        </Flex>
      )} */}
    </>
  );
};

const ProposalsListPage = withContract(ReferralsPage) as LayoutPage;

ProposalsListPage.layout = Layouts.DASHBOARD;

export default ProposalsListPage;
