import { VStack } from '@chakra-ui/react';

export const FormContainer: React.FC = ({ children }) => (
  <VStack
    as="form"
    pt="50px"
    pb="100px"
    overflowY="auto"
    width={{ md: 'max(50%, 300px)', base: '100%' }}
    align="start"
    gap="6"
    color="#ffffff"
  >
    {children}
  </VStack>
);
