import { Box, Heading, Text } from '@chakra-ui/react';

interface FormHeadingProps {
  heading: string;
  helperText: string;
}

const FormHeading: React.FC<FormHeadingProps> = ({ heading, helperText }) => {
  return (
    <>
      <Box w="80%" color="#ffffff">
        <Heading as="h2">{heading}</Heading>
        <Text mt="2"> {helperText} </Text>
      </Box>
    </>
  );
};
export default FormHeading;
