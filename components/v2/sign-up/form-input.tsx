import { FormControl, FormLabel, Input } from '@chakra-ui/react';

type FormInputPropsType = {
  label: string;
  placeholder: string;
  id: string;
  type: string;
  value: string;
  onChange?: (val: string) => void;
  required?: boolean;
  readonly?: boolean;
};

export const FormInput: React.FC<FormInputPropsType> = ({
  label,
  placeholder,
  id,
  type,
  onChange,
  value,
  required = false,
  readonly = false,
}) => {
  return (
    <FormControl w="80%" isRequired={required}>
      <FormLabel fontSize="sm" htmlFor={id}>
        {label}
      </FormLabel>
      {onChange ? (
        <Input
          pl="12px"
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
          defaultValue={value}
          borderRadius="5px"
          id={id}
          variant="flushed"
          placeholder={placeholder}
          size="lg"
          type={type}
          readOnly={readonly}
        />
      )}
    </FormControl>
  );
};
