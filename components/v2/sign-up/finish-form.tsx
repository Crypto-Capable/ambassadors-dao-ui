import {
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { isGeneratorObject } from 'util/types';
import { FormValuesAtom } from '../../../atoms/form';
import fn from '../../../util/update-atom';
import FormHeading from './form-heading';
import { FormInput } from './form-input';

export const FinishForm: React.FC = () => {
  const [formValues, setFormValues] = useAtom(FormValuesAtom);
  const {
    firstName,
    lastName,
    emailId,
    phoneNo,
    institution,
    discordHandle,
    referralCode,
  } = formValues;

  useEffect(() => {
    setFormValues({ ...formValues, currentForm: 4 });
  }, []);
  return (
    <VStack align="start" gap="6" color="#ffffff">
      <FormHeading
        heading="Let’s have you Double-Check"
        helperText="You can go back to change anything if you wish to do so, otherwise tick the box and smash the submit button"
      />
      <HStack w="80%" gap="5" justifyContent="flex-start">
        <FormInput
          type="text"
          value={firstName}
          readonly
          id="first-name"
          label="First Name"
          placeholder="John"
        />
        <FormInput
          type="text"
          value={lastName}
          readonly
          id="last-name"
          label="Last Name"
          placeholder="Doe"
        />
      </HStack>

      <FormInput
        label="Email ID"
        readonly
        value={emailId}
        id="email"
        placeholder="john@company.com"
        type="email"
      />

      <FormInput
        type="number"
        value={phoneNo}
        readonly
        id="phone"
        label="Contact"
        placeholder="+ 91 99999 99999"
      />

      <FormInput
        type="text"
        value={institution}
        readonly
        id="institution"
        label="Institute"
        placeholder="IIT Bombay"
      />

      <FormInput
        type="text"
        value={referralCode}
        readonly
        id="referral-code"
        label="Referral Code"
        placeholder="ABCD1234"
      />

      <FormInput
        type="text"
        value={discordHandle}
        readonly
        id="discord-handle"
        label="Discord Handle"
        placeholder="John#0007"
      />
    </VStack>
  );
};
