import {
  Flex,
  Text,
  Table,
  Heading,
  TableCaption,
  Thead,
  Tr,
  Td,
  Tbody,
  Th,
  Link,
} from '@chakra-ui/react';
import { MemeCompletionBounty } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type MemeCompletionItemProps = {
  item: MemeCompletionBounty;
};

export const MemeCompletionItem: React.FC<MemeCompletionItemProps> = ({
  item: MemeCompletion,
}) => {
  return (
    <>
      <ItemDetailContainer
        text="Number of Submissions"
        value={MemeCompletion.num_of_submissions}
      />
      <Table mt={8} variant="simple">
        <TableCaption>Meme Winners</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Account id</Th>
            <Th>Submission Link</Th>
          </Tr>
        </Thead>
        <Tbody>
          {MemeCompletion &&
            MemeCompletion.winners_info.map((submission, index) => (
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
