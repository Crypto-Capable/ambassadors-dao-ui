import { Box, Heading, Text } from '@chakra-ui/react';
export type PayoutItemDescriptionProps = {
  proposer: string;
  description: string;
  children?: React.ReactNode;
};

export const PayoutItemDescription: React.FC<PayoutItemDescriptionProps> = ({
  proposer,
  description,
  children,
}) => {
  return (
    <>
      <Heading as="h3" fontSize="1.25rem">
        By {proposer}
      </Heading>
      <Text mt={2}>{description}</Text>
      {children ? children : null}
    </>
  );
};
