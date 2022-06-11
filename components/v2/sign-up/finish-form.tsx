import { HStack } from '@chakra-ui/react';
import FormHeading from './form-heading';
import { FormInput } from './form-input';

export const FinishForm: React.FC = () => (
  <>
    <FormHeading
      heading="Let’s have you Double-Check"
      helperText="You can go back to change anything if you wish to do so, otherwise tick the box and smash the submit button"
    />
    <FormInput
      type="text"
      readonly
      id="first_name"
      label="First Name"
      placeholder="John"
    />
    <FormInput
      type="text"
      readonly
      id="last_name"
      label="Last Name"
      placeholder="Doe"
    />

    <FormInput
      label="Email ID"
      readonly
      id="email_id"
      placeholder="john@company.com"
      type="email"
    />

    <FormInput
      type="number"
      readonly
      id="phone_no"
      label="Contact"
      placeholder="+ 91 99999 99999"
    />

    <FormInput
      type="text"
      readonly
      id="institution"
      label="Institute"
      placeholder="IIT Bombay"
    />

    <FormInput
      type="text"
      readonly
      id="referral_code"
      label="Referral Code"
      placeholder="ABCD1234"
    />

    <FormInput
      type="text"
      readonly
      id="discord_handle"
      label="Discord Handle"
      placeholder="John#0007"
    />
  </>
);
