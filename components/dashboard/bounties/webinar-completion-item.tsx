import { Link } from '@chakra-ui/react';
import { WebinarBounty } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type WebinarCompletionItemProps = {
  item: WebinarBounty;
};

export const WebinarCompletionItem: React.FC<WebinarCompletionItemProps> = ({
  item: WebinarCompletion,
}) => {
  return (
    <>
      <ItemDetailContainer
        text="Number of Registrations"
        value={WebinarCompletion.num_of_registrations}
      />
      <ItemDetailContainer
        text="Number of Attendees"
        value={WebinarCompletion.num_of_attendees}
      />
      <Link pt={2} isExternal href={`${WebinarCompletion.webinar_link}`}>
        Webinar Link
      </Link>
    </>
  );
};
