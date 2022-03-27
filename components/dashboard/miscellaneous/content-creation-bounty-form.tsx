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
import {
  placeholderDriveLink,
  placeholderDropboxLink,
  placeholderInstagramLink,
} from '../../../util/constants';

export type ContentCreationBountyFormProps = {
  onSubmitStart: () => void;
  onSubmitEnd: (v: number) => void;
};

const linksPlaceholder = `${placeholderDriveLink}\n${placeholderDropboxLink}\n${placeholderInstagramLink}`;

export const ContentCreationForm: React.FC<ContentCreationBountyFormProps> = ({
  onSubmitStart,
  onSubmitEnd,
}) => {
  const [note, setNote] = useState<string>('');
  const [contentLinks, setContentLinks] = useState<string>('');
  const [expectedAmount, setExpectedAmount] = useState<number>(0);

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
            ContentCreationBounty: {
              links_to_content: contentLinks.split('\n').map((s) => s.trim()),
              note,
              expected_amount: expectedAmount,
            },
          },
        },
      });
      onSubmitEnd(v);
    } catch (err) {
      console.log(err);
      onSubmitEnd(-1);
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
        <FormLabel htmlFor="contentLinks">Content Links</FormLabel>
        <Textarea
          id="contentLinks"
          value={contentLinks}
          onChange={({ target: { value } }) => setContentLinks(value)}
          placeholder={linksPlaceholder}
        />
        <FormHelperText>
          List of the all link of the content pieces that you have created, put
          each link on a separate line.
        </FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="expectedAmount">Content Links</FormLabel>
        <Input
          id="expectedAmount"
          type="number"
          value={expectedAmount}
          onChange={({ target: { value } }) => setExpectedAmount(Number(value))}
          placeholder={linksPlaceholder}
        />
        <FormHelperText>
          The expected amount of NEAR tokens for the content produced.
        </FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="note">Brief Note</FormLabel>
        <Textarea
          id="story"
          value={note}
          onChange={({ target: { value } }) => setNote(value)}
        />
        <FormHelperText>
          A short note describing your experience with this content creation.
        </FormHelperText>
      </FormControl>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </chakra.form>
  );
};
