import {
  Box,
  FormControl,
  Text,
  FormLabel,
  IconButton,
  Input,
  Flex,
} from '@chakra-ui/react';
import { Check } from 'phosphor-react';
import React, { useState } from 'react';
import { SubmissionInfo } from '../../../types';

export type SubmissionInfoInputProps = {
  onDone: (arg: SubmissionInfo) => void;
};

const SubmissionInfoInput: React.FC<SubmissionInfoInputProps> = ({
  onDone,
}) => {
  const [name, setName] = useState<string>('');
  const [accountId, setAccountId] = useState<string>('');
  const [submissionLink, setSubmissionLink] = useState<string>('');

  const onSubmit = () => {
    onDone({
      name,
      account_id: accountId,
      submission_link: submissionLink,
    });
  };

  return (
    <Box experimental_spaceY="4" flex="1">
      <FormControl isRequired>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          required
          id="name"
          type="text"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="accountId">Near Account ID</FormLabel>
        <Input
          required
          id="accountId"
          type="text"
          value={accountId}
          onChange={({ target: { value } }) => setAccountId(value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="numOfSubmissions">Submission Link</FormLabel>
        <Input
          required
          id="submissionLink"
          type="url"
          value={submissionLink}
          onChange={({ target: { value } }) => setSubmissionLink(value)}
        />
      </FormControl>
      <Flex mt="4" justifyContent="space-between">
        <Text display="inline">Confirm Details</Text>
        <IconButton
          aria-label="Click to confirm winner details"
          variant="outline"
          onClick={onSubmit}
          icon={<Check weight="bold" />}
          size="xs"
          type="button"
          borderWidth="px"
        />
      </Flex>
    </Box>
  );
};

export default SubmissionInfoInput;
