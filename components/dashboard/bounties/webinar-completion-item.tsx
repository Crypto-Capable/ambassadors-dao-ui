import { Link } from '@chakra-ui/react';
import { WebinarBounty } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type WebinarCompletionItemProps = {
  item: WebinarBounty;
};

export const WebinarCompletionItem: React.FC<WebinarCompletionItemProps> = ({
  item,
}) => {
  return (
    <>
      <ItemDetailContainer
        text="Number of Registrations"
        value={item.num_of_registrations}
      />
      <ItemDetailContainer
        text="Number of Attendees"
        value={item.num_of_attendees}
      />
      <Link pt={2} isExternal href={item.webinar_link}>
        Webinar Link
      </Link>
    </>
  );
};
