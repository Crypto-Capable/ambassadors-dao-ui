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
import { placeholderAccountId } from '../../../util/constants';
import { handlePayoutCreationError } from '../../../util/errors';

export type RecruitmentFormProps = {
  onSubmitStart: () => void;
  onSubmitEnd: (v: number, msg?: string) => void;
};

export const RecruitmentForm: React.FC<RecruitmentFormProps> = ({
  onSubmitStart,
  onSubmitEnd,
}) => {
  const [referredId, setReferredId] = useState<string>('');
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
      const v = await contract.contract.add_payout_referral({
        payout: {
          description,
          information: {
            Recruitment: {
              referrer_id: contract.contract.account.accountId,
              referred_id: referredId,
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
        <FormHelperText>A short decription for this referral.</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="referredId">Referred person</FormLabel>
        <Input
          id="referredId"
          type="text"
          value={referredId}
          onChange={({ target: { value } }) => setReferredId(value)}
          placeholder={placeholderAccountId}
        />
        <FormHelperText>
          The person you referred to who was recruited.
        </FormHelperText>
      </FormControl>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </chakra.form>
  );
};
