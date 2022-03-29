import React, { memo, useCallback, useState } from 'react';
import { Button, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { Check, X } from 'phosphor-react';
import { useContractContext } from '../../../context/contract-context';

export type BallotProps = {
  alreadyVoted: boolean;
};

// TODO: open a modal on vote button press and if user wants to add a note, they can
// TODO: remove payout option for the proposer
const Ballot: React.FC<BallotProps> = ({ alreadyVoted }) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { contract } = useContractContext()!;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleApproveRequest = useCallback(async () => {
    if (alreadyVoted) {
      toast({
        description: 'You have made your vote',
        status: 'info',
      });
      return;
    }
    setSubmitting(true);
    try {
      // call the method
    } catch {
      toast({
        description: 'Failed to make the vote',
        status: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }, [contract, alreadyVoted, toast]);

  const handleRejectRequest = useCallback(async () => {
    if (alreadyVoted) {
      toast({
        description: 'You have made your vote',
        status: 'info',
      });
      return;
    }
    setSubmitting(true);
    try {
      // call the method
    } catch {
      toast({
        description: 'Failed to make the vote',
        status: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }, [contract, alreadyVoted, toast]);

  return (
    <Flex mt="4" alignItems="center" justifyContent="space-between">
      <Button
        onClick={handleApproveRequest}
        colorScheme="green"
        leftIcon={<Check weight="bold" />}
      >
        Approve
      </Button>
      <Button colorScheme="red" leftIcon={<X weight="bold" />}>
        Reject
      </Button>
    </Flex>
  );
};

export default memo(Ballot);
