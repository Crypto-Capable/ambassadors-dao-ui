import { Flex, Text } from '@chakra-ui/react';

export type ItemContainerProps = {
  text: string;
  value: number;
};

export const ItemContainer: React.FC<ItemContainerProps> = ({
  text,
  value,
}) => {
  console.log(text);
  return (
    <Flex mt={2} gap="6px">
      <Text>{text}</Text>
      <Text pl="2" pr="2" bg="gray.100">
        {value}
      </Text>
    </Flex>
  );
};
