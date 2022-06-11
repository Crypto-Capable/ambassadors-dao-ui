import FormHeading from './form-heading';
import { FormInput } from './form-input';
export const ReferralForm: React.FC = () => (
  <>
    <FormHeading
      heading="Referral Code"
      helperText="Enter the looong code given to you"
    />

    <FormInput
      required
      type="text"
      label="Enter referral code"
      placeholder="ABCD1234"
      id="referral_code"
    />
  </>
);
