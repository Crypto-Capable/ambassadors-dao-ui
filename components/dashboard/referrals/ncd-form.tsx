import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  chakra,
  Button,
  Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useContractContext } from '../../../context/contract-context';
import { NCDReferralKind } from '../../../types';
import {
  placeholderAccountId,
  placeholderDropboxLink,
} from '../../../util/constants';
import { handlePayoutCreationError } from '../../../util/errors';

export type NCDFormProps = {
  onSubmitStart: () => void;
  onSubmitEnd: (v: number, msg?: string) => void;
};

export const NCDForm: React.FC<NCDFormProps> = ({
  onSubmitStart,
  onSubmitEnd,
}) => {
  const [referredId, setReferredId] = useState<string>('');
  const [proofLink, setProofLink] = useState<string>('');
  const [kind, setKind] = useState<NCDReferralKind>();
  const [description, setDescription] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const contract = useContractContext();

  const handleKindChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setKind(e.target.value as NCDReferralKind);
  };

  const handleProposalSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    onSubmitStart();
    setSubmitting(true);
    if (!contract || !kind) {
      return;
    }

    try {
      const v = await contract.contract.add_payout_referral({
        payout: {
          description,
          information: {
            NearCertifiedDeveloper: {
              referrer_id: contract.contract.account.accountId,
              referred_id: referredId,
              kind,
              proof_link: proofLink,
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
      <Select
        mt="4"
        placeholder="Select NCD Referral Type"
        value={kind}
        onChange={handleKindChange}
        disabled={submitting}
      >
        <option value={NCDReferralKind.COMPLETION}>
          {NCDReferralKind.COMPLETION}
        </option>
        <option value={NCDReferralKind.FORM_FILLED}>
          {NCDReferralKind.FORM_FILLED}
        </option>
      </Select>
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
          The person you are referring to for this NCD referral.
        </FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="proofLink">Supporting Proof Link</FormLabel>
        <Input
          id="proofLink"
          type="url"
          value={proofLink}
          onChange={({ target: { value } }) => setProofLink(value)}
          placeholder={placeholderDropboxLink}
        />
        <FormHelperText>URL to the proof for this referral.</FormHelperText>
      </FormControl>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </chakra.form>
  );
};
