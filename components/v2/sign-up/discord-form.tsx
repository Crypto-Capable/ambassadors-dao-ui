import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { FormValuesAtom } from '../../../atoms/form';
import FormHeading from './form-heading';
import { FormInput } from './form-input';
export const DiscordForm: React.FC = () => {
  return (
    <>
      <FormHeading
        heading="Discord Handle"
        helperText="Enter your correct discord id otherwise you shall be ignored"
      />

      <FormInput
        required
        type="text"
        label="Enter your discord handle"
        placeholder="John#0007"
        id="discord_handle"
      />
    </>
  );
};
