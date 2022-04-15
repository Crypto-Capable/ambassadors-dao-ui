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

export type OpenProposalFormProps = {
  onSubmitStart: () => void;
  onSubmitEnd: (v: number, msg?: string) => void;
};

export const OpenProposalForm: React.FC<OpenProposalFormProps> = ({
  onSubmitStart,
  onSubmitEnd,
}) => {
  const [estimatedBudget, setEstimatedBudget] = useState<number>(0);
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
      const v = await contract.contract.add_payout_proposal({
        payout: {
          description,
          information: {
            Open: {
              estimated_budget: estimatedBudget,
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
        <FormHelperText>
          A document describing everything concerning this event.
        </FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="estimatedBudget">
          Estimated Budget (Value in USD)
        </FormLabel>
        <Input
          id="estimatedBudget"
          type="number"
          value={estimatedBudget === 0 ? '' : estimatedBudget}
          onChange={({ target: { value } }) =>
            setEstimatedBudget(Number(value))
          }
        />
        <FormHelperText>
          The amount of money you will require, in USD.
        </FormHelperText>
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
