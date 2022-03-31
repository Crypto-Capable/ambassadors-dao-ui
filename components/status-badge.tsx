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
    case PayoutStatus.APPROVED:
      return <Badge colorScheme="green">APPROVED</Badge>;
    case PayoutStatus.REJECTED:
      return <Badge colorScheme="red">REJECTED</Badge>;
    case PayoutStatus.UNDER_CONSIDERATION:
      return <Badge colorScheme="blue">UNDER CONSIDERATION</Badge>;
    case PayoutStatus.REMOVED:
      return <Badge colorScheme="red">REMOVED</Badge>;
  }
};

export default StatusBadge;
