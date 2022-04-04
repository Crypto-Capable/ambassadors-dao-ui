import { Heading, Text } from '@chakra-ui/react';
import { ItemDetailContainer } from './item-detail-container';

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
    <ItemDetailContainer text="Description" value={description} />
    {children}
  </>
);
