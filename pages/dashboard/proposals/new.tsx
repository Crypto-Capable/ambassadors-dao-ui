import { Box, Heading, Select, Text, useToast } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useState } from 'react';
import {
  HackathonInput,
  MemeContestInput,
  OpenInput,
} from '../../../components/dashboard/proposals/';
import { Layouts } from '../../../layouts';
import { LayoutPage } from '../../../types';

type TypesOfProposals = 'Hackathon' | 'MemeContest' | 'Open';

const NewProposal: LayoutPage = () => {
  const [proposalType, setProposalType] =
    useState<TypesOfProposals>('Hackathon');
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
    } else {
      toast({
        description: 'Proposal creation failed, try again',
        status: 'error',
      });
    }
  };

  return (
    <>
      <Head>Create a Proposal</Head>
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
        <option value="Hackathon">Hackathon</option>
        <option value="MemeContest">MemeContest</option>
        <option value="Open">Open</option>
      </Select>
      {((p: TypesOfProposals) => {
        switch (p) {
          case 'Hackathon':
            return (
              <HackathonInput
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
          case 'MemeContest':
            return (
              <MemeContestInput
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
          case 'Open':
            return (
              <OpenInput
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
        }
      })(proposalType)}
    </>
  );
};

NewProposal.layout = Layouts.DASHBOARD;

export default NewProposal;
