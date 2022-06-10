import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { FormValuesAtom } from '../../../atoms/form';
import FormHeading from './form-heading';
import { FormInput } from './form-input';
export const ReferralForm: React.FC = () => {
  const [formValues, setFormValues] = useAtom(FormValuesAtom);
  const [code, setCode] = useState<string>(formValues.referralCode);

  useEffect(() => {
    formValues.referralCode = code;
    setFormValues({ ...formValues, currentForm: 2 });
  }, [code]);
  return (
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
        id="referral-code"
        value={code}
        onChange={setCode}
      />
    </>
  );
};
