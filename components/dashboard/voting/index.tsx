import React, { useMemo } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react';
import { Payout, PayoutType, Vote } from '../../../types';
import { Check, X } from 'phosphor-react';
import Ballot from './ballot';
import { ItemDetailContainer } from '../item-detail-container';

const voteEmoji = (vote: Vote) => {
  if (vote === Vote.APPROVE) {
    return <Check weight="bold" />;
  } else if (vote === Vote.REJECT) {
    return <X weight="bold" />;
  }
};

export type VotesDisplayProps = {
  isCouncilMember: boolean;
  accountId: string;
  payoutId: string;
  payoutType: PayoutType;
} & Pick<Payout<{}>, 'votes' | 'votes_count'>;

const VotesDisplay: React.FC<VotesDisplayProps> = ({
  accountId,
  isCouncilMember,
  votes,
  votes_count,
  payoutId,
  payoutType,
}) => {
  const { approve_count, reject_count } = votes_count;

  const votesValue = useMemo(() => {
    const sum = approve_count + reject_count;
    if (sum === 0) {
      return 0;
    } else {
      return Math.round((approve_count / sum) * 100);
    }
  }, [approve_count, reject_count]);

  const votesArray = Object.entries(votes);
  const alreadyVoted = votesArray.find(([k]) => k === accountId);

  return (
    <Box mt="4">
      {/* <Accordion
        rounded="md"
        borderRight="1px"
        borderLeft="1px"
        overflow="hidden"
        borderColor="gray.300"
      >
        <AccordionItem>
          <AccordionButton> */}
      <Flex alignItems="center" flex="1">
        <Text mr="4">Votes</Text>

        <Progress
          value={votesValue}
          rounded="md"
          colorScheme="teal"
          backgroundColor={votesArray.length === 0 ? 'gray.200' : 'red.600'}
          flex="1"
          mr="4"
        />
      </Flex>
      {(approve_count || reject_count) && (
        <>
          <ItemDetailContainer
            text="Approve Vote-Count"
            value={approve_count}
          />
          <ItemDetailContainer text="Reject Vote-Count" value={reject_count} />
        </>
      )}

      {/* <AccordionIcon />
          </AccordionButton>
          <AccordionPanel> */}
      {votesArray.length === 0 ? (
        <Text>No votes to show yet</Text>
      ) : (
        <TableContainer mt="4">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Council Member</Th>
                <Th>Approved</Th>
              </Tr>
            </Thead>
            <Tbody>
              {votesArray.map(([councilMember, vote], index) => (
                <Tr key={index}>
                  <Td>{councilMember}</Td>
                  <Td>{voteEmoji(vote)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {/* </AccordionPanel>
        </AccordionItem>
      </Accordion> */}
      {isCouncilMember &&
        (alreadyVoted ? (
          <Text mt="4">
            You have {alreadyVoted![1]}ed the {payoutType}
          </Text>
        ) : (
          <Ballot id={payoutId} payoutType={payoutType} />
        ))}
    </Box>
  );
};

export default VotesDisplay;
