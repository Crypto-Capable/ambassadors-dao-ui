import Link from 'next/link';
import {
  Link as ChakraLink,
  Flex,
  useMediaQuery,
  Box,
  Text,
  ListItem,
} from '@chakra-ui/react';
import { PayoutStatus } from '../../../types';
import StatusBadge from '../../status-badge';
import { useMemo } from 'react';
export type PayoutListItemProps = {
  id: number;
  link: string;
  description: string;
  status: PayoutStatus;
  proposer: string;
};

export const PayoutListItem: React.FC<PayoutListItemProps> = ({
  id,
  link,
  description,
  status,
  proposer,
}) => {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');

  const proposedBy = useMemo(() => {
    if (proposer.endsWith('.near') || proposer.endsWith('.testnet')) {
      return proposer;
    }
    return 'a Campus Ambassador';
  }, [proposer]);

  return (
    <ListItem>
      <Link href={link} passHref>
        <ChakraLink
          display="flex"
          alignItems={isLargerThan1024 ? 'center' : 'start'}
          justifyContent="space-between"
          flexDirection={isLargerThan1024 ? 'row' : 'column'}
        >
          <Box>
            <Text display="inline-block">
              <strong>{id}&gt;</strong> {description}
            </Text>
          </Box>
          <Flex
            alignItems={isLargerThan1024 ? 'center' : 'start'}
            gap="2"
            flexDir={isLargerThan1024 ? 'row' : 'column'}
          >
            <Text>By {proposedBy}</Text>
            <StatusBadge status={status} />
          </Flex>
        </ChakraLink>
      </Link>
    </ListItem>
  );
};
