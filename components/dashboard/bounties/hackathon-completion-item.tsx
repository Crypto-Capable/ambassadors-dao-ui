import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Link,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';
import { HackathonCompletionBounty } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type HackathonCompletionItemProp = {
  item: HackathonCompletionBounty;
};

export const HackathonCompletionItem: React.FC<HackathonCompletionItemProp> = ({
  item: HackathonCompletion,
}) => {
  return (
    <>
      <ItemDetailContainer
        text="Number of Registrations"
        value={HackathonCompletion.num_of_registrations}
      />
      <ItemDetailContainer
        text="Number of Submissions"
        value={HackathonCompletion.num_of_submissions}
      />
      <Table mt={8} variant="simple">
        <TableCaption>Hackathon Winners</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Account id</Th>
            <Th>Submission Link</Th>
          </Tr>
        </Thead>
        <Tbody>
          {HackathonCompletion &&
            HackathonCompletion.winners_info.map((submission, index) => (
              <Tr key={index}>
                <Td>{submission.name}</Td>
                <Td>{submission.account_id}</Td>
                <Td>
                  <Link href={`${submission.submission_link}`} isExternal>
                    Link{' '}
                  </Link>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </>
  );
};
