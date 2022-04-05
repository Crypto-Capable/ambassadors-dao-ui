import { Heading, Select, Text, useToast } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  HackathonCompletionForm,
  MemeContestCompletionForm,
  WebinarForm,
} from '../../../components/dashboard/bounties';
import { ContentCoordinationForm } from '../../../components/dashboard/bounties/content-coordination-form';
import { Layouts } from '../../../layouts';
import { LayoutPage, Tabs, TypesOfBounties } from '../../../types';

const NewBounty: LayoutPage = () => {
  const router = useRouter();
  const [bountyType, setBountyType] = useState<TypesOfBounties>(
    TypesOfBounties.HACKATHON_COMPLETION
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
        description: 'Bounty created',
        status: 'success',
      });
      router.push(`/dashboard/${Tabs.BOUNTIES}/${v}`);
    } else {
      toast({
        description: 'Bounty creation failed, try again',
        status: 'error',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Create a Bounty</title>
      </Head>
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
        <option value={TypesOfBounties.HACKATHON_COMPLETION}>
          Hackathon Completion
        </option>
        <option value={TypesOfBounties.MEME_CONTEST_COMPLETION}>
          Meme Contest Completion
        </option>
        <option value={TypesOfBounties.WEBINAR}>Webinar</option>
        <option value={TypesOfBounties.CONTENT_COORDINATION}>
          Content Coordination
        </option>
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
