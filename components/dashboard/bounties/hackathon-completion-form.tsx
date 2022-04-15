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
import { SubmissionInfo } from '../../../types';
import { handlePayoutCreationError } from '../../../util/errors';
import SubmissionInfoInput from './submission-info-input';

export type HackathonCompletionFormProps = {
  onSubmitStart: () => void;
  onSubmitEnd: (v: number, msg?: string) => void;
};

const dummySubmissionInfo: SubmissionInfo = {
  account_id: '',
  name: '',
  submission_link: '',
};

export const HackathonCompletionForm: React.FC<
  HackathonCompletionFormProps
> = ({ onSubmitStart, onSubmitEnd }) => {
  const [numOfRegistrations, setNumOfRegistrations] = useState<number>(0);
  const [numOfSubmissions, setNumOfSubmissions] = useState<number>(0);
  const [winnersInfo, setWinnersInfo] = useState([
    Object.assign({}, dummySubmissionInfo),
    Object.assign({}, dummySubmissionInfo),
    Object.assign({}, dummySubmissionInfo),
  ]);
  const [description, setDescription] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const contract = useContractContext();

  const handleOnDone = (n: number) => (s: SubmissionInfo) => {
    setWinnersInfo((i) => {
      i[n] = s;
      return i;
    });
  };

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
            HackathonCompletion: {
              num_of_registrations: numOfRegistrations,
              num_of_submissions: numOfSubmissions,
              winners_info: winnersInfo,
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
        <FormLabel htmlFor="numOfRegistrations">
          Number of Registrations
        </FormLabel>
        <Input
          id="numOfRegistrations"
          type="number"
          value={numOfRegistrations === 0 ? '' : numOfRegistrations}
          onChange={({ target: { value } }) =>
            setNumOfRegistrations(Number(value))
          }
        />
        <FormHelperText>
          The number of registrations this hackathon got.
        </FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="numOfSubmissions">Number of Submissions</FormLabel>
        <Input
          id="numOfSubmissions"
          type="number"
          value={numOfSubmissions === 0 ? '' : numOfSubmissions}
          onChange={({ target: { value } }) =>
            setNumOfSubmissions(Number(value))
          }
        />
        <FormHelperText>
          The number of submissions that were made for this hackathon.
        </FormHelperText>
      </FormControl>
      <Text fontWeight="bold">Winners Info</Text>
      <Flex experimental_spaceX="4">
        <SubmissionInfoInput onDone={handleOnDone(0)} />
        <SubmissionInfoInput onDone={handleOnDone(1)} />
        <SubmissionInfoInput onDone={handleOnDone(2)} />
      </Flex>
      <Button isLoading={submitting} type="submit">
        Submit
      </Button>
    </chakra.form>
  );
};
