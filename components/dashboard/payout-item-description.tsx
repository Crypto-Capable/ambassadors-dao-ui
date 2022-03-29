import { Heading, Text } from '@chakra-ui/react';

export type PayoutItemDescriptionProps = {
  proposer: string;
  description: string;
};

export const PayoutItemDescription: React.FC<PayoutItemDescriptionProps> = ({
  proposer,
  description,
  children,
}) => (
  <>
    <Heading as="h3" fontSize="1.25rem">
      By {proposer}
    </Heading>
    <Text mt={2}>{description}</Text>
    {children}
  </>
);
