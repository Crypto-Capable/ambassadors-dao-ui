import { Box, Heading, Select, Text, useToast } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useState } from 'react';
import {
  HackathonCompletionForm,
  MemeContestCompletionForm,
  WebinarForm,
} from '../../../components/dashboard/bounties';
import { ContentCoordinationForm } from '../../../components/dashboard/bounties/content-coordination-form';
import {
  HackathonInput,
  MemeContestInput,
  OpenInput,
} from '../../../components/dashboard/proposals/';
import { Layouts } from '../../../layouts';
import { LayoutPage } from '../../../types';

type TypesOfBounties =
  | 'HackathonCompletion'
  | 'MemeContestCompletion'
  | 'Webinar'
  | 'ContentCoordination';

const NewBounty: LayoutPage = () => {
  const [bountyType, setBountyType] = useState<TypesOfBounties>(
    'HackathonCompletion'
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const toast = useToast();

  const handleBountyTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setBountyType(e.target.value as TypesOfBounties);
  };

  const handleSubmitStart = () => setSubmitting(true);
  const handleSubmitEnd = (v: number) => {
    setSubmitting(false);
    if (v > 0) {
      toast({
        description: 'Proposal created',
        status: 'success',
      });
    } else {
      toast({
        description: 'Proposal creation failed, try again',
        status: 'error',
      });
    }
  };

  return (
    <>
      <Head>Create a Bounty</Head>
      <Heading as="h2" fontSize="1.75rem">
        Create a New Bounty
      </Heading>
      <Text fontWeight="bold" mt="4">
        Select the type of Bounty
      </Text>
      <Select
        mt="4"
        placeholder="Select bounty type"
        value={bountyType}
        onChange={handleBountyTypeChange}
        disabled={submitting}
      >
        <option value="HackathonCompletion">Hackathon Completion</option>
        <option value="MemeContestCompletion">Meme Contest Completion</option>
        <option value="Webinar">Webinar</option>
        <option value="ContentCoordination">Content Coordination</option>
      </Select>
      {((p: TypesOfBounties) => {
        switch (p) {
          case 'HackathonCompletion':
            return (
              <HackathonCompletionForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
          case 'MemeContestCompletion':
            return (
              <MemeContestCompletionForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
          case 'Webinar':
            return (
              <WebinarForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
          case 'ContentCoordination':
            return (
              <ContentCoordinationForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
        }
      })(bountyType)}
    </>
  );
};

NewBounty.layout = Layouts.DASHBOARD;

export default NewBounty;
