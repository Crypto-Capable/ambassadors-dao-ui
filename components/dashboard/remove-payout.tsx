import React, { useCallback, useState } from 'react';
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Trash } from 'phosphor-react';
import { useContractContext } from '../../context/contract-context';
import {
  PayoutType,
  Action,
  actPayoutFn,
  changeFunctionsType,
} from '../../types';

export type RemovePayoutProps = {
  payoutId: string;
  payoutType: PayoutType;
};

const RemovePayout: React.FC<RemovePayoutProps> = ({
  payoutId,
  payoutType,
}) => {
  const [note, setNote] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { contract } = useContractContext()!;

  const handleSubmit = useCallback(
    async (note: string) => {
      let trimmedNote: string | null = note.trim();
      if (trimmedNote.length === 0) {
        trimmedNote = null;
      }
      setSubmitting(true);
      try {
        // call the method
        const methodName =
          `act_payout_${payoutType}` as keyof changeFunctionsType;
        await (contract[methodName] as actPayoutFn)({
          id: Number(payoutId),
          action: Action.REMOVE_PAYOUT,
          note: trimmedNote,
        });
        toast({
          description: 'Payout was removed',
          status: 'success',
        });
      } catch {
        toast({
          description: 'Failed to remove the payout',
          status: 'error',
        });
      } finally {
        setSubmitting(false);
        setNote('');
        onClose();
      }
    },
    [payoutId, contract, toast, payoutType, onClose]
  );

  return (
    <>
      <IconButton
        icon={<Trash weight="bold" />}
        aria-label="Remove the payout"
        onClick={onOpen}
        variant="outline"
        colorScheme="red"
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform="capitalize">
            removing your {payoutType}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to remove your {payoutType}?</Text>
            <FormControl mt="4">
              <FormLabel htmlFor="note">Optional Note</FormLabel>
              <Input
                id="note"
                type="text"
                value={note}
                onChange={({ target: { value } }) => setNote(value)}
              />
              <FormHelperText>
                You may add a small note specifying the reason for removing this{' '}
                {payoutType}.
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
            <Button isLoading={submitting} onClick={() => handleSubmit(note)}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemovePayout;
