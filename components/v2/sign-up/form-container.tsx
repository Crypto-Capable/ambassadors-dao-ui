import { VStack } from '@chakra-ui/react';

const FormContainer: React.FC = ({ children }) => {
  return (
    <VStack
      as="form"
      pt="50px"
      pb="100px"
      overflowY="auto"
      width={{ md: 'max(50%, 400px)', base: '100%' }}
      align="start"
      gap="6"
      color="#ffffff"
    >
      {children}
    </VStack>
  );
};

export default FormContainer;
