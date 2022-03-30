import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  ModalFooter,
  Button,
  UseModalProps,
  useToast,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useContractContext } from '../../../context/contract-context';
import {
  Action,
  actPayoutFn,
  changeFunctionsType,
  PayoutType,
} from '../../../types';

export type NoteModalProps = {
  id: string;
  alreadyVoted: boolean;
  payoutType: PayoutType;
  action: Action.VOTE_APPROVE | Action.VOTE_REJECT | null;
} & Pick<UseModalProps, 'isOpen' | 'onClose'>;

const NoteModal: React.FC<NoteModalProps> = ({
  id,
  alreadyVoted,
  payoutType,
  isOpen,
  onClose,
  action,
}) => {
  const [note, setNote] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const toast = useToast();
  const { contract } = useContractContext()!;

  const handleSubmit = () => {
    if (action === Action.VOTE_APPROVE) {
      handleApproveRequest(note);
    } else if (action === Action.VOTE_REJECT) {
      handleRejectRequest(note);
    }
  };

  const handleApproveRequest = useCallback(
    async (note: string | null) => {
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
        const methodName =
          `act_payout_${payoutType}` as keyof changeFunctionsType;
        await (contract[methodName] as actPayoutFn)({
          id: Number(id),
          action: Action.VOTE_APPROVE,
          note,
        });
        toast({
          description: 'Your vote was recorded',
          status: 'success',
        });
      } catch {
        toast({
          description: 'Failed to make the vote',
          status: 'error',
        });
      } finally {
        setSubmitting(false);
        onClose();
      }
    },
    [id, contract, alreadyVoted, toast, payoutType, onClose]
  );

  const handleRejectRequest = useCallback(
    async (note: string | null) => {
      if (alreadyVoted) {
        toast({
          description: 'You have made your vote',
          status: 'info',
        });
        return;
      }
      setSubmitting(true);
      try {
        const methodName =
          `act_payout_${payoutType}` as keyof changeFunctionsType;
        await (contract[methodName] as actPayoutFn)({
          id: Number(id),
          action: Action.VOTE_APPROVE,
          note,
        });
        toast({
          description: 'Your vote was recorded',
          status: 'success',
        });
      } catch {
        toast({
          description: 'Failed to make the vote',
          status: 'error',
        });
      } finally {
        setSubmitting(false);
        onClose();
      }
    },
    [id, contract, alreadyVoted, toast, payoutType, onClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="note">Optional Note</FormLabel>
            <Input
              id="note"
              type="text"
              value={note}
              onChange={({ target: { value } }) => setNote(value)}
            />
            <FormHelperText>
              You may add a small note for making this action.
            </FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            mr="4"
            variant="ghost"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button isLoading={submitting} onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NoteModal;
