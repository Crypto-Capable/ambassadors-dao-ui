import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { FormKeysType, FormValuesAtom } from '../../../atoms/form';
import { Forms } from '../../../types/forms';

type FormInputPropsType = {
  label: string;
  placeholder: string;
  id: FormKeysType;
  type: string;
  //onChange?: (id: FormKeysType, value: string) => void;
  required?: boolean;
  readonly?: boolean;
};

export const FormInput: React.FC<FormInputPropsType> = ({
  label,
  placeholder,
  id,
  type,
  required = false,
  readonly = false,
}) => {
  const [formValues, setFormValues] = useAtom(FormValuesAtom);
  const handler = (id: FormKeysType, value: string) => {
    formValues[id] = value;
    setFormValues({ ...formValues });
  };
  return (
    <FormControl w="100%" isRequired={required}>
      <FormLabel fontSize="sm" htmlFor={id}>
        {label}
      </FormLabel>
      {!readonly ? (
        <Input
          pl="12px"
          value={formValues[id]}
          onChange={(e) => {
            handler(e.target.id as FormKeysType, e.target.value);
          }}
          borderRadius="5px"
          id={id}
          variant="flushed"
          placeholder={placeholder}
          size="lg"
          type={type}
        />
      ) : (
        <Input
          pl="12px"
          defaultValue={formValues[id]}
          borderRadius="5px"
          id={id}
          variant="flushed"
          placeholder={placeholder}
          size="lg"
          type={type}
          _focus={{}}
          readOnly={readonly}
          bgColor="gray.800"
        />
      )}
    </FormControl>
  );
};
