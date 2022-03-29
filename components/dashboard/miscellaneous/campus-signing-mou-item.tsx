import { Link, Text } from '@chakra-ui/react';
import { CampusSigningMOU } from '../../../types';

export type CampusSigningMOUItemProps = {
  item: CampusSigningMOU;
};

export const CampusSigningMOUItem: React.FC<CampusSigningMOUItemProps> = ({
  item,
}) => (
  <Link isExternal href={item.supporting_document}>
    <Text mt={2} color="blue.600">
      Support Document
    </Text>
  </Link>
);
