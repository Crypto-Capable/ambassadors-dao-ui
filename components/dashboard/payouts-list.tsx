import {
  Box,
  Flex,
  Tooltip,
  IconButton,
  Center,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { useState } from 'react';
import { PayoutsListProps, TypesOfPayouts } from '../../types';
import { PayoutListItem } from './payout-list-item';
import { pageItemsLimit as limit } from '../../util/constants';

function PayoutsList<T extends TypesOfPayouts>({
  contract,
  usePayoutData,
  tab,
  label,
}: PayoutsListProps<T>) {
  const [page, setPage] = useState(1);
  const from = (page - 1) * limit + 1;
  const { data, loading, error } = usePayoutData({ contract, from, limit });

  if (data !== undefined && data.length > 0) {
    return (
      <>
        <Box experimental_spaceY="4" mt="8">
          {data.map((p) => (
            <PayoutListItem
              key={p.id}
              description={p.description}
              status={p.status}
              proposer={p.proposer}
              id={p.id}
              link={`/dashboard/${tab}/${p.id}`}
            />
          ))}
        </Box>
        <Flex alignItems="center" mt="8" justifyContent="space-between">
          <Tooltip label="Show previous page">
            <IconButton
              variant="outline"
              icon={<CaretLeft />}
              disabled={page < 2}
              onClick={() => setPage((p) => p - 1)}
              aria-label="Show previous page"
            />
          </Tooltip>
          <Tooltip label="Show next page">
            <IconButton
              variant="outline"
              icon={<CaretRight />}
              disabled={data?.length !== limit}
              onClick={() => setPage((p) => p + 1)}
              aria-label="Show next page"
            />
          </Tooltip>
        </Flex>
      </>
    );
  } else if (!loading && data && data.length === 0) {
    return <Text mt="2">No {label} payouts to view!</Text>;
  } else if (!loading && error) {
    return <Text>Not Found</Text>;
  }
  return (
    <Center>
      <Spinner />
    </Center>
  );
}

export default PayoutsList;
