import { Badge, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { PayoutStatus } from '../types';

type StatusBadgeProps = {
  status: PayoutStatus;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');
  const position = !isLargerThan480 ? 'fixed' : 'static';
  const left = !isLargerThan480 ? '5' : '';
  const bottom = !isLargerThan480 ? '5' : '';
  const properties = [position, left, bottom];
  switch (status) {
    case 'Approved':
      return <Badge colorScheme="green">APPROVED</Badge>;
    case 'Rejected':
      return <Badge colorScheme="red">REJECTED</Badge>;
    case 'UnderConsideration':
      return <Badge colorScheme="blue">UNDER CONSIDERATION</Badge>;
    default:
      return <Badge colorScheme="red">REMOVED</Badge>;
  }
};

export default StatusBadge;
