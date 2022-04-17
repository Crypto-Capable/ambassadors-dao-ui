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
import { placeholderReferralToken } from '../../../util/constants';
import { handlePayoutCreationError } from '../../../util/errors';

export type RegistrationFormProps = {
  onSubmitStart: () => void;
  onSubmitEnd: (v: number, msg?: string) => void;
};

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmitStart,
  onSubmitEnd,
}) => {
  const [referralToken, setReferralToken] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { contract } = useContractContext()!;

  const handleProposalSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    onSubmitStart();
    setSubmitting(true);

    try {
      const res = await contract.register_ambassador({ token: referralToken });
      onSubmitEnd(0, res.message);
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
        <FormHelperText>A short description for this referral.</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="referralToken">Referral Token</FormLabel>
        <Input
          id="referralToken"
          type="text"
          value={referralToken}
          onChange={({ target: { value } }) => setReferralToken(value)}
          placeholder={placeholderReferralToken}
        />
        <FormHelperText>Referral token that you intend to use.</FormHelperText>
      </FormControl>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </chakra.form>
  );
};
