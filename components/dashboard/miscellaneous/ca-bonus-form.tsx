import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  chakra,
  Button,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useContractContext } from '../../../context/contract-context';
import { handlePayoutCreationError } from '../../../util/errors';

export type CABonusFormProps = {
  onSubmitStart: () => void;
  onSubmitEnd: (v: number, msg?: string) => void;
};

export const CABonusForm: React.FC<CABonusFormProps> = ({
  onSubmitStart,
  onSubmitEnd,
}) => {
  const [linksToPayouts, setLinksToPayouts] = useState<string>('');
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
            CampusAmbassadorBonus: {
              links_to_payouts: linksToPayouts.split('\n').map((l) => l.trim()),
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
        <FormLabel htmlFor="linksToPayouts">Payouts Links</FormLabel>
        <Textarea
          id="linksToPayouts"
          value={linksToPayouts}
          onChange={({ target: { value } }) => setLinksToPayouts(value)}
          placeholder=""
        />
        <FormHelperText>
          List of the all links of the payouts that you have created, put each
          link on a separate line.
        </FormHelperText>
      </FormControl>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </chakra.form>
  );
};
