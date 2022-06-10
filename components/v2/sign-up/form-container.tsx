import { useMediaQuery, VStack } from '@chakra-ui/react';

type FormContainerPropsType = {
  isMobile?: boolean;
};

const FormContainer: React.FC<FormContainerPropsType> = ({
  children,
  isMobile = false,
}) => {
  return (
    <VStack
      pt="20px"
      pb="70px"
      w="100%"
      h={isMobile ? 'auto' : '75vh'}
      overflowY="auto"
      align="start"
      gap="6"
      color="#ffffff"
    >
      {children}
    </VStack>
  );
};

export default FormContainer;
