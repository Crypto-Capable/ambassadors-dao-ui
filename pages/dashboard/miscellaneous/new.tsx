import { Box, Heading, Select, Text, useToast } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  CABonusForm,
  CampusSigningMOUForm,
  ContentCreationForm,
} from '../../../components/dashboard/miscellaneous';
import { Layouts } from '../../../layouts';
import { LayoutPage, Tabs, TypesOfMiscellaneous } from '../../../types';

const NewMiscellaneous: LayoutPage = () => {
  const router = useRouter();
  const [miscType, setMiscType] = useState<TypesOfMiscellaneous>(
    TypesOfMiscellaneous.CAMPUS_AMBASSADOR_BONUS
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const toast = useToast();

  const handleMiscTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setMiscType(e.target.value as TypesOfMiscellaneous);
  };

  const handleSubmitStart = () => setSubmitting(true);
  const handleSubmitEnd = (v: number) => {
    setSubmitting(false);
    if (v > 0) {
      toast({
        description: 'Miscellaneous payout created',
        status: 'success',
      });
      router.push(`/dashboard/${Tabs.MISCELLANEOUS}/${v}`);
    } else {
      toast({
        description: 'Miscellaneous payout creation failed, try again',
        status: 'error',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Create a Miscellaneous Payout</title>
      </Head>
      <Heading as="h2" fontSize="1.75rem">
        Create a New Miscellaneous Payout
      </Heading>
      <Text fontWeight="bold" mt="4">
        Select the type of Miscellaneous Payout
      </Text>
      <Select
        mt="4"
        placeholder="Select Miscellaneous Payout type"
        value={miscType}
        onChange={handleMiscTypeChange}
        disabled={submitting}
      >
        <option value={TypesOfMiscellaneous.CAMPUS_AMBASSADOR_BONUS}>
          Campus Ambassador Bonus
        </option>
        <option value={TypesOfMiscellaneous.CAMPUS_SIGNING_MOU}>
          Campus Signing MOU
        </option>
        <option value={TypesOfMiscellaneous.CONTENT_CREATION_BOUNTY}>
          Content Creation Bounty
        </option>
      </Select>
      {(() => {
        switch (miscType) {
          case TypesOfMiscellaneous.CAMPUS_AMBASSADOR_BONUS:
            return (
              <CABonusForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
          case TypesOfMiscellaneous.CAMPUS_SIGNING_MOU:
            return (
              <CampusSigningMOUForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
          case TypesOfMiscellaneous.CONTENT_CREATION_BOUNTY:
            return (
              <ContentCreationForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
        }
      })()}
    </>
  );
};

NewMiscellaneous.layout = Layouts.DASHBOARD;

export default NewMiscellaneous;
