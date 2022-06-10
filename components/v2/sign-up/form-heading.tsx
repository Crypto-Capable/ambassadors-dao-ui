import { Box, Heading, Text } from '@chakra-ui/react';

interface FormHeadingProps {
  heading: string;
  helperText: string;
}

const FormHeading: React.FC<FormHeadingProps> = ({ heading, helperText }) => {
  return (
    <>
      <Box>
        <Heading as="h2">{heading}</Heading>
        <Text mt="2">{helperText}</Text>
      </Box>
    </>
  );
};
export default FormHeading;
