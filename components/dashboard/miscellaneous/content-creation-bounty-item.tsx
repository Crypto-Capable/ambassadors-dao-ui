import { Link, ListItem, UnorderedList, Text } from '@chakra-ui/react';
import { ContentCreationMiscellaneous } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type ContentCreationMiscellaneousItemProps = {
  item: ContentCreationMiscellaneous;
};

export const ContentCreationMiscellaneousItem: React.FC<
  ContentCreationMiscellaneousItemProps
> = ({ item }) => (
  <>
    <ItemDetailContainer
      label="Expected Amount"
      value={item.expected_amount}
      denomination
    />
    <ItemDetailContainer label="Note" value={item.note} />
    <Text mt={2}>Links to content -</Text>
    <UnorderedList>
      {item.links_to_content.map((link, index) => (
        <ListItem key={index}>
          <Link isExternal href={link}>
            <Text color="blue.600">{link}</Text>
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  </>
);
