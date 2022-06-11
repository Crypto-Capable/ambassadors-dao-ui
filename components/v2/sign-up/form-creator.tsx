import { FormKeysType } from '../../../atoms/form';
import FormHeading from './form-heading';
import { FormInput } from './form-input';

export type FormCreaterPropType = {
  heading: string;
  helperText: string;
  inputs: inputData[];
};

type inputData = {
  id: string;
  label: string;
  placeholder: string;
  readOnly: boolean;
  required: boolean;
  type: string;
};
export const FormCreator: React.FC<FormCreaterPropType> = ({
  heading,
  helperText,
  inputs,
}) => {
  return (
    <>
      <FormHeading heading={heading} helperText={helperText} />
      {inputs.map((input) => (
        <FormInput
          type={input.type}
          label={input.label}
          placeholder={input.placeholder}
          id={input.id as FormKeysType}
          required={input.required}
          key={input.id}
          readonly={input.readOnly}
        />
      ))}
    </>
  );
};
