import { Box, Heading, Select, Text, useToast } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useState } from 'react';
import {
  RegistrationForm,
  RecruitmentForm,
  NCDForm,
} from '../../../components/dashboard/referrals';
import { Layouts } from '../../../layouts';
import { LayoutPage, TypesOfReferrals } from '../../../types';

const NewReferral: LayoutPage = () => {
  const [referralType, setReferralType] = useState<TypesOfReferrals>(
    TypesOfReferrals.AMBASSADOR_REGISTRATION
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const toast = useToast();

  const handleReferralTypeChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = (e) => {
    setReferralType(e.target.value as TypesOfReferrals);
  };

  const handleSubmitStart = () => setSubmitting(true);
  const handleSubmitEnd = (v: number) => {
    setSubmitting(false);
    if (v > 0) {
      toast({
        description: 'Referral created',
        status: 'success',
      });
    } else {
      toast({
        description: 'Referral creation failed, try again',
        status: 'error',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Create a Referral</title>
      </Head>
      <Heading as="h2" fontSize="1.75rem">
        Create a New Referral
      </Heading>
      <Text fontWeight="bold" mt="4">
        Select the type of Referral
      </Text>
      <Select
        mt="4"
        placeholder="Select referral type"
        value={referralType}
        onChange={handleReferralTypeChange}
        disabled={submitting}
      >
        <option value={TypesOfReferrals.AMBASSADOR_REGISTRATION}>
          Ambassador Registration
        </option>
        <option value={TypesOfReferrals.RECRUITMENT}>Recruitment</option>
        <option value={TypesOfReferrals.NEAR_CERTIFIED_DEVELOPER}>
          Near Certified Developer
        </option>
      </Select>
      {(() => {
        switch (referralType) {
          case TypesOfReferrals.AMBASSADOR_REGISTRATION:
            return (
              <RegistrationForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
          case TypesOfReferrals.RECRUITMENT:
            return (
              <RecruitmentForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
          case TypesOfReferrals.NEAR_CERTIFIED_DEVELOPER:
            return (
              <NCDForm
                onSubmitStart={handleSubmitStart}
                onSubmitEnd={handleSubmitEnd}
              />
            );
        }
      })()}
    </>
  );
};

NewReferral.layout = Layouts.DASHBOARD;

export default NewReferral;
