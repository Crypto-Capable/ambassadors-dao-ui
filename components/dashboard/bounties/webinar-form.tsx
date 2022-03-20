import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  chakra,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useContractContext } from '../../../context/contract-context';

export type WebinarFormProps = {
  onSubmitStart: () => void;
  onSubmitEnd: (v: number) => void;
};

export const WebinarForm: React.FC<WebinarFormProps> = ({
  onSubmitStart,
  onSubmitEnd,
}) => {
  const [numOfRegistrations, setNumOfRegistrations] = useState<number>(0);
  const [numOfAttendees, setNumOfAttendees] = useState<number>(0);
  const [webinarLink, setWebinarLink] = useState<string>('');
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
            Webinar: {
              num_of_registrations: numOfRegistrations,
              num_of_attendees: numOfAttendees,
              webinar_link: webinarLink,
            },
          },
        },
      });
      onSubmitEnd(v);
    } catch (err) {
      console.log(err);
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
        <FormLabel htmlFor="numOfRegistrations">
          Number of Registrations
        </FormLabel>
        <Input
          id="numOfRegistrations"
          type="number"
          value={numOfRegistrations}
          onChange={({ target: { value } }) =>
            setNumOfRegistrations(Number(value))
          }
        />
        <FormHelperText>
          The number of registrations this hackathon got.
        </FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="numOfAttendees">Number of Attendees</FormLabel>
        <Input
          id="numOfAttendees"
          type="number"
          value={numOfAttendees}
          onChange={({ target: { value } }) => setNumOfAttendees(Number(value))}
        />
        <FormHelperText>
          The number of attendees for this webinar.
        </FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="webinarLink">Webinar Link</FormLabel>
        <Input
          id="webinarLink"
          type="url"
          value={webinarLink}
          onChange={({ target: { value } }) => setWebinarLink(value)}
        />
        <FormHelperText>
          Link to the (zoom/teams/etc...) meeting for this webinar.
        </FormHelperText>
      </FormControl>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </chakra.form>
  );
};
