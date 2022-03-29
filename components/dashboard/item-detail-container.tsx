import { Flex, Text } from '@chakra-ui/react';

export type ItemContainerProps = {
  text: string;
  value?: number | string;
  link?: string;
};

export const ItemDetailContainer: React.FC<ItemContainerProps> = ({
  text,
  value,
}) => (
  <Flex mt={2} gap="6px">
    <Text>{text}</Text>
    <Text pl="2" pr="2" bg="gray.100">
      {value ? value : null}
    </Text>
  </Flex>
);
