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
  Badge,
  Text,
} from '@chakra-ui/react';
import { captureException } from '@sentry/nextjs';
import React, { useCallback, useState } from 'react';
import { useContractContext } from '../../../context/contract-context';
import { useUsePayoutByType } from '../../../hooks/payout-hooks';
import {
  Action,
  actPayoutFn,
  changeFunctionsType,
  PayoutType,
} from '../../../types';

type VoteAction = Action.VOTE_APPROVE | Action.VOTE_REJECT;

export type NoteModalProps = {
  id: string | number;
  payoutType: PayoutType;
  action: VoteAction | null;
} & Pick<UseModalProps, 'isOpen' | 'onClose'>;

const NoteModal: React.FC<NoteModalProps> = ({
  id,
  payoutType,
  isOpen,
  onClose,
  action,
}) => {
  const [note, setNote] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const toast = useToast();
  const { contract } = useContractContext()!;
  const usePayoutItem = useUsePayoutByType(payoutType);
  const { refetch } = usePayoutItem({ contract, id: Number(id) });

  const handleVoteRequest = useCallback(
    async (note: string | null, action: VoteAction) => {
      setSubmitting(true);
      try {
        // call the method
        const methodName =
          `act_payout_${payoutType}` as keyof changeFunctionsType;
        await (contract[methodName] as actPayoutFn)({
          id: Number(id),
          action,
          note,
        });
        toast({
          description: 'Your vote was recorded',
          status: 'success',
        });
        refetch({ id: Number(id) }).catch((err) => {
          captureException(err);
          window.location.reload();
        });
      } catch {
        toast({
          description: 'Failed to make the vote',
          status: 'error',
        });
      } finally {
        setSubmitting(false);
        setNote('');
        onClose();
      }
    },
    [id, contract, toast, payoutType, onClose, refetch]
  );

  const handleSubmit = () => {
    if (!action) return;
    handleVoteRequest(note, action);
  };

  const voteLabel = action?.slice(4).toLowerCase();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Your Vote</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            You have given a vote to
            <Badge
              colorScheme={voteLabel === 'reject' ? 'red' : 'green'}
              mx="2"
            >
              {voteLabel}
            </Badge>
            the {payoutType}
          </Text>
          <FormControl mt="4">
            <FormLabel htmlFor="note">Optional Note</FormLabel>
            <Input
              id="note"
              type="text"
              value={note}
              onChange={({ target: { value } }) => setNote(value)}
            />
            <FormHelperText>
              You may add a small note for making this vote.
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
