import { Box, Heading, Select, Text, useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  HackathonForm,
  MemeContestForm,
  OpenProposalForm,
} from '../../../components/dashboard/proposals/';
import { Layouts } from '../../../layouts';
import { LayoutPage, TypesOfProposals } from '../../../types';

const NewProposal: LayoutPage = () => {
  const router = useRouter();
  const [proposalType, setProposalType] = useState<TypesOfProposals>(
    TypesOfProposals.HACKATHON
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const toast = useToast();

  const handleProposalTypeChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = (e) => {
    setProposalType(e.target.value as TypesOfProposals);
  };

  const handleSubmitStart = () => setSubmitting(true);
  const handleSubmitEnd = (v: number) => {
    setSubmitting(false);
    if (v > 0) {
      toast({
        description: 'Proposal created',
        status: 'success',
      });
      router.push(`/dashboard/proposals/${v}`);
    } else {
      toast({
        description: 'Proposal creation failed, try again',
        status: 'error',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Create a Proposal</title>
      </Head>
      <Heading as="h2" fontSize="1.75rem">
        Create a New Proposal
      </Heading>
      <Text fontWeight="bold" mt="4">
        Select the type of Proposal
      </Text>
      <Select
        mt="4"
        placeholder="Select proposal type"
        value={proposalType}
        onChange={handleProposalTypeChange}
        disabled={submitting}
      >
        <option value={TypesOfProposals.HACKATHON}>Hackathon</option>
        <option value={TypesOfProposals.MEME_CONTEST}>Meme Contest</option>
        <option value={TypesOfProposals.OPEN}>Open Proposal</option>
      </Select>
      {(() => {
        switch (proposalType) {
          case TypesOfProposals.HACKATHON:
            return (
              <HackathonForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
          case TypesOfProposals.MEME_CONTEST:
            return (
              <MemeContestForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
          case TypesOfProposals.OPEN:
            return (
              <OpenProposalForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
        }
      })()}
    </>
  );
};

NewProposal.layout = Layouts.DASHBOARD;

export default NewProposal;
