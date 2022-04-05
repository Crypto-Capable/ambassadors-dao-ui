import { Link, Box } from '@chakra-ui/react';
import { WebinarBounty } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type WebinarCompletionItemProps = {
  item: WebinarBounty;
};

export const WebinarCompletionItem: React.FC<WebinarCompletionItemProps> = ({
  item,
}) => (
  <>
    <ItemDetailContainer
      label="Number of Registrations"
      value={item.num_of_registrations}
    />
    <ItemDetailContainer
      label="Number of Attendees"
      value={item.num_of_attendees}
    />
    <Box mt={2}>
      <Link isExternal href={item.webinar_link}>
        Webinar Link
      </Link>
    </Box>
  </>
);
