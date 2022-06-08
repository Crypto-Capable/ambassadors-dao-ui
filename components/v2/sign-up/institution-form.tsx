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
export const InsitutionForm: React.FC = () => {
  const [formValues, setFormValues] = useAtom(FormValuesAtom);
  const [institute, setInstitute] = useState<string>('');
  const [otherWork, setOtherWork] = useState<string>('');
  useEffect(() => {
    setFormValues({ ...formValues, currentForm: 1 });
  }, []);
  return (
    <VStack align="start" gap="6" color="#ffffff">
      <FormHeading
        heading="Insitution"
        helperText={`Pleae let us know of the institution you’re “currently studying” or “a graduate from” or “anything else that you’re doing”`}
      />

      <FormControl w="80%" isRequired>
        <FormLabel fontSize="sm" htmlFor="institution">
          Instutition
        </FormLabel>
        <Input
          value={institute}
          pl="12px"
          onChange={(e) => setInstitute(e.target.value)}
          borderRadius="5px"
          id="institution"
          variant="flushed"
          placeholder="Search for your college..."
          size="lg"
          type="text"
        />
      </FormControl>
      <FormInput
        type="text"
        label="Other"
        placeholder="Working at..."
        id="other-work"
        value={otherWork}
        onChange={setOtherWork}
      />
    </VStack>
  );
};
