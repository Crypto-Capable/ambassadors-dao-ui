import { Link, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { CampusAmbassadorBonus } from '../../../types';

export type CABonusItemProps = {
  item: CampusAmbassadorBonus;
};

export const CABonusItem: React.FC<CABonusItemProps> = ({ item }) => {
  return (
    <>
      <Text mt={2}>Links to Payouts - </Text>
      <UnorderedList mt={2}>
        {item.links_to_payouts.map((link, index) => (
          <ListItem key={index}>
            <Link isExternal href={link}>
              {link}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
};
