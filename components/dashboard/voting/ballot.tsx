import React, { memo, useCallback, useState } from 'react';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { Check, X } from 'phosphor-react';
import { PayoutType, Action } from '../../../types';
import NoteModal from './note-modal';

export type BallotProps = {
  id: string;
  payoutType: PayoutType;
};

const Ballot: React.FC<BallotProps> = ({ id, payoutType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState<
    Action.VOTE_APPROVE | Action.VOTE_REJECT | null
  >(null);

  return (
    <>
      <Flex mt="4" alignItems="center" justifyContent="space-between">
        <Button
          onClick={() => {
            setAction(Action.VOTE_APPROVE);
            onOpen();
          }}
          colorScheme="green"
          leftIcon={<Check weight="bold" />}
        >
          Approve
        </Button>
        <Button
          onClick={() => {
            setAction(Action.VOTE_REJECT);
            onOpen();
          }}
          colorScheme="red"
          leftIcon={<X weight="bold" />}
        >
          Reject
        </Button>
      </Flex>
      <NoteModal
        isOpen={isOpen}
        onClose={onClose}
        id={id}
        payoutType={payoutType}
        action={action}
      />
    </>
  );
};

export default memo(Ballot);
