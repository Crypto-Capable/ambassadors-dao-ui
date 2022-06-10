import { useMediaQuery, VStack } from '@chakra-ui/react';

const FormContainer: React.FC = ({ children }) => {
  const [isMobile] = useMediaQuery('(max-width: 600px');
  return (
    <VStack align={isMobile ? 'center' : 'start'} gap="6" color="#ffffff">
      {children}
    </VStack>
  );
};

export default FormContainer;
