import { Box, Link } from '@chakra-ui/react';
import { HackathonProposal } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type HackathonProposalItemProps = {
  item: HackathonProposal;
};
export const HackathonProposalItem: React.FC<HackathonProposalItemProps> = ({
  item: HackathonProposal,
}) => (
  <>
    <ItemDetailContainer
      text="Expected Registrations"
      value={HackathonProposal.expected_registrations}
    />
    <ItemDetailContainer
      text="Estimated Budget"
      value={HackathonProposal.estimated_budget}
      denomination
    />

    <Box mt={2}>
      <Link
        color="blue.600"
        isExternal
        href={`${HackathonProposal.supporting_document}`}
      >
        Supporting Doc
      </Link>
    </Box>
  </>
);
