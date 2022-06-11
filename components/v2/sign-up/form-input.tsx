import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { FormKeysType, FormValuesAtom } from '../../../atoms/form';

type FormInputPropsType = {
  label: string;
  placeholder: string;
  id: FormKeysType;
  type: string;
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
  let val;
  if (readonly)
    val = {
      _focus: {},
    };
  return (
    <FormControl w="100%" isRequired={required}>
      <FormLabel fontSize="sm" htmlFor={id}>
        {label}
      </FormLabel>
      <Input
        pl="12px"
        value={formValues[id]}
        onChange={(e) => {
          if (!readonly) handler(e.target.id as FormKeysType, e.target.value);
        }}
        borderRadius="5px"
        id={id}
        variant="flushed"
        placeholder={placeholder}
        size="lg"
        readOnly={readonly}
        bgColor={readonly ? 'gray.800' : 'black'}
        type={type}
        {...val}
      />
    </FormControl>
  );
};
