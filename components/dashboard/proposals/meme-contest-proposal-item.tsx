import { Box, Link } from '@chakra-ui/react';
import { HackathonProposal, MemeContestProposal } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type MemeContestProposalItemProps = {
  item: MemeContestProposal;
};
export const MemeContestProposalItem: React.FC<
  MemeContestProposalItemProps
> = ({ item: MemeContestProposal }) => {
  return (
    <>
      <ItemDetailContainer
        text="Estimated Budget"
        value={MemeContestProposal.estimated_budget}
      />
      <ItemDetailContainer
        text="Expected Registrations"
        value={MemeContestProposal.expected_registrations}
      />
      <Box mt={2}>
        <Link
          color="blue.600"
          isExternal
          href={`${MemeContestProposal.supporting_document}`}
        >
          Supporting Doc
        </Link>
      </Box>
    </>
  );
};
