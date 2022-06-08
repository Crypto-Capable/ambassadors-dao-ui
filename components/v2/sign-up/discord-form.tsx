import {
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { FormValuesAtom } from '../../../atoms/form';
import FormHeading from './form-heading';
import { FormInput } from './form-input';
export const DiscordForm: React.FC = () => {
  const [formValues, setFormValues] = useAtom(FormValuesAtom);
  const [handle, setHandle] = useState<string>(formValues.discordHandle);

  useEffect(() => {
    formValues.discordHandle = handle;
    setFormValues({ ...formValues, currentForm: 3 });
  }, [handle]);
  return (
    <VStack align="start" gap="6" color="#ffffff">
      <FormHeading
        heading="Discord Handle"
        helperText="Enter your correct discord id otherwise you shall be ignored"
      />

      <FormInput
        required
        type="text"
        label="Enter your discord handle"
        placeholder="John#0007"
        id="discord-handle"
        value={handle}
        onChange={setHandle}
      />
    </VStack>
  );
};
