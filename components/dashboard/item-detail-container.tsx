import { Flex, Text } from '@chakra-ui/react';

export type ItemContainerProps = {
  label: string;
  value?: number | string;
  link?: string;
  denomination?: boolean;
};

export const ItemDetailContainer: React.FC<ItemContainerProps> = ({
  label: text,
  value,
  denomination,
}) => (
  <Flex mt={2} gap="6px">
    <Text>{text}</Text>
    <Text pl="2" pr="2" bg="gray.100">
      {value} {denomination && 'Near'}
    </Text>
  </Flex>
);
