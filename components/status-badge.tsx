import { Badge } from '@chakra-ui/react';
import React from 'react';
import { PayoutStatusType } from '../types';

type StatusBadgeProps = {
  status: PayoutStatusType;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  if (typeof status === 'string') {
    switch (status) {
      case 'Approved':
        return <Badge colorScheme="green">APPROVED</Badge>;
      case 'Rejected':
        return <Badge colorScheme="red">REJECTED</Badge>;
      case 'UnderConsideration':
        return <Badge colorScheme="blue">UNDER CONSIDERATION</Badge>;
    }
  } else {
    return <Badge colorScheme="red">REMOVED</Badge>;
  }
};

export default StatusBadge;
