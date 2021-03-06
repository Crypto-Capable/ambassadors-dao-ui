import { Box, Link } from '@chakra-ui/react';
import { OpenProposal } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type OpenProposalItemProps = {
  item: OpenProposal;
};

export const OpenProposalItem: React.FC<OpenProposalItemProps> = ({
  item: OpenProposal,
}) => (
  <>
    <ItemDetailContainer
      label="Estimated Budget"
      value={OpenProposal.estimated_budget}
      denomination
    />
    <Box mt={2}>
      <Link
        color="blue.600"
        isExternal
        href={`${OpenProposal.supporting_document}`}
      >
        Supporting Doc
      </Link>
    </Box>
  </>
);
