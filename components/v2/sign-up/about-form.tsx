import FormHeading from './form-heading';
import { FormInput } from './form-input';

export const AboutForm: React.FC = () => {
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
        id="first_name"
      />

      <FormInput
        required
        type="text"
        label="Last Name"
        placeholder="Doe"
        id="last_name"
      />

      <FormInput
        id="email_id"
        label="Email ID"
        type="email"
        placeholder="john@company.com"
        required={true}
      />
      <FormInput
        type="number"
        label="Would you like to get a call from one of our Voyager to induct you on
          this journey?"
        placeholder="+ 91 99999 99999"
        id="phone_no"
      />
    </>
  );
};
