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
import { handlePayoutCreationError } from '../../../util/errors';

export type ContentCoordinationFormProps = {
  onSubmitStart: () => void;
  onSubmitEnd: (v: number, msg?: string) => void;
};

const linksPlaceholder = `${placeholderDriveLink}\n${placeholderDropboxLink}\n${placeholderInstagramLink}`;
const toolsPlaceholder = 'adobe xd\nadobe illustrator';

export const ContentCoordinationForm: React.FC<
  ContentCoordinationFormProps
> = ({ onSubmitStart, onSubmitEnd }) => {
  const [story, setStory] = useState<string>('');
  const [toolsUsed, setToolsUsed] = useState<string>('');
  const [contentLinks, setContentLinks] = useState<string>('');

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
      const v = await contract.contract.add_payout_bounty({
        payout: {
          description,
          information: {
            ContentCoordination: {
              content_links: contentLinks.split('\n').map((s) => s.trim()),
              story,
              tools_used: toolsUsed.split('\n').map((s) => s.trim()),
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
        <FormLabel htmlFor="story">Story</FormLabel>
        <Textarea
          id="story"
          value={story}
          onChange={({ target: { value } }) => setStory(value)}
        />
        <FormHelperText>
          A short story describing your experience with this content creation.
        </FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="toolsUsed">Tools Used</FormLabel>
        <Textarea
          id="toolsUsed"
          value={toolsUsed}
          onChange={({ target: { value } }) => setToolsUsed(value)}
          placeholder={toolsPlaceholder}
        />
        <FormHelperText>
          List of the tools you have used, put each tool on a separate line.
        </FormHelperText>
      </FormControl>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </chakra.form>
  );
};
