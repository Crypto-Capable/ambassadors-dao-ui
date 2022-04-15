import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  chakra,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useContractContext } from '../../../context/contract-context';
import { placeholderDropboxLink } from '../../../util/constants';
import { handlePayoutCreationError } from '../../../util/errors';

export type CampusSigningMOUFormProps = {
  onSubmitStart: () => void;
  onSubmitEnd: (v: number, msg?: string) => void;
};

export const CampusSigningMOUForm: React.FC<CampusSigningMOUFormProps> = ({
  onSubmitStart,
  onSubmitEnd,
}) => {
  const [supportingDocument, setSupportingDocument] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const contract = useContractContext();

  const handleProposalSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    onSubmitStart();
    setSubmitting(true);
    if (!contract) {
      return;
    }

    try {
      const v = await contract.contract.add_payout_miscellaneous({
        payout: {
          description,
          information: {
            CampusSigningMOU: {
              supporting_document: supportingDocument,
            },
          },
        },
      });
      onSubmitEnd(v);
    } catch (err) {
      const msg = handlePayoutCreationError(err);
      onSubmitEnd(-1, msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <chakra.form mt="4" experimental_spaceY="4" onSubmit={handleProposalSubmit}>
      <FormControl isRequired>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={({ target: { value } }) => setDescription(value)}
        />
        <FormHelperText>A description for this bounty.</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="supportingDocument">
          Supporting Document Link
        </FormLabel>
        <Input
          id="supportingDocument"
          type="url"
          value={supportingDocument}
          onChange={({ target: { value } }) => setSupportingDocument(value)}
          placeholder={placeholderDropboxLink}
        />
        <FormHelperText>
          A document describing everything concerning this event.
        </FormHelperText>
      </FormControl>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </chakra.form>
  );
};
