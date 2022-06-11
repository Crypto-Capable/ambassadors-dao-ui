import { HStack, useMediaQuery } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { FormValuesAtom } from '../../../atoms/form';
import FormHeading from './form-heading';
import { FormInput } from './form-input';

export const AboutForm: React.FC = () => {
  const [formValues, setFormValues] = useAtom(FormValuesAtom);
  const [firstName, setFirstName] = useState<string>(formValues.firstName);
  const [lastName, setLastName] = useState<string>(formValues.lastName);
  const [email, setEmail] = useState<string>(formValues.emailId);
  const [phoneNo, setPhoneNo] = useState<string>(formValues.phoneNo);

  useEffect(() => {
    formValues.firstName = firstName;
    formValues.lastName = lastName;
    formValues.emailId = email;
    formValues.phoneNo = phoneNo;

    setFormValues({ ...formValues, currentForm: 0 });
  }, [firstName, lastName, email, phoneNo]);

  return (
    <>
      <FormHeading
        heading="Tell Us a few things about you"
        helperText="Fill in the personal details"
      />
      <FormInput
        required
        type="text"
        label="First Name"
        placeholder="John"
        id="first-name"
        value={firstName}
        onChange={setFirstName}
      />

      <FormInput
        required
        type="text"
        label="Last Name"
        placeholder="Doe"
        id="last-name"
        value={lastName}
        onChange={setLastName}
      />

      <FormInput
        id="email"
        label="Email ID"
        type="email"
        placeholder="john@company.com"
        onChange={setEmail}
        value={email}
        required={true}
      />
      <FormInput
        type="number"
        label="Would you like to get a call from one of our Voyager to induct you on
          this journey?"
        placeholder="+ 91 99999 99999"
        id="phone"
        value={phoneNo}
        onChange={setPhoneNo}
      />
    </>
  );
};
