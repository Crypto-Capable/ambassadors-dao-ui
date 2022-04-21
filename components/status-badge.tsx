import React from 'react';
import { Badge } from '@chakra-ui/react';
import { PayoutStatus } from '../types';

type StatusBadgeProps = {
  status: PayoutStatus;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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
