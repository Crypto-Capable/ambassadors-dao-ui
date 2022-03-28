import { Link, UnorderedList, ListItem, Heading, Text } from '@chakra-ui/react';
import { ContentCoordintionBounty } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type ContentCoordinationItemProps = {
  item: ContentCoordintionBounty;
};

export const ContentCoordinationItem: React.FC<
  ContentCoordinationItemProps
> = ({ item }) => {
  return (
    <>
      <ItemDetailContainer text="Story" value={item.story} />
      <Text mt={2}> Content Links - </Text>
      <UnorderedList>
        {item.content_links.map((item_link, index) => (
          <ListItem key={index}>
            <Link isExternal href={item_link}>
              {item_link}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
      <Text mt={2}>Tools Used</Text>
      <UnorderedList>
        {item.tools_used.map((tool, index) => (
          <ListItem key={index}> {tool}</ListItem>
        ))}
      </UnorderedList>
    </>
  );
};
