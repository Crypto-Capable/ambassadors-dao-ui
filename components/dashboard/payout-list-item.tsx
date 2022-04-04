import Link from 'next/link';
import {
  Link as ChakraLink,
  Flex,
  useMediaQuery,
  Box,
  Text,
} from '@chakra-ui/react';
import { PayoutStatus } from '../../types';
import StatusBadge from '../status-badge';
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
  const [isLargerThan480] = useMediaQuery('(min-width: 520px)');
  let finalProposer = 'A Campus Ambassador';
  if (
    proposer.endsWith('.near') ||
    proposer.endsWith('.mainnet') ||
    proposer.endsWith('.testnet')
  )
    finalProposer = proposer;

  return (
    <Link href={link} passHref>
      <ChakraLink
        as={Flex}
        alignItems={isLargerThan480 ? 'center' : 'start'}
        justifyContent="space-between"
        flexDir={isLargerThan480 ? 'row' : 'column'}
      >
        <Box>
          <Text display="inline-block">
            <strong>{id}&gt;</strong> {description}
          </Text>
        </Box>
        <Flex
          alignItems={isLargerThan480 ? 'center' : 'start'}
          gap="2"
          flexDir={isLargerThan480 ? 'row' : 'column'}
        >
          <Text>By {finalProposer}</Text>
          <StatusBadge status={status} />
        </Flex>
      </ChakraLink>
    </Link>
  );
};
