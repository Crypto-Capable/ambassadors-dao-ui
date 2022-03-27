import { Box, Link } from '@chakra-ui/react';
import { OpenProposal } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type OpenProposalItemProps = {
  item: OpenProposal;
};

export const OpenProposalItem: React.FC<OpenProposalItemProps> = ({
  item: OpenProposal,
}) => {
  return (
    <>
      <ItemDetailContainer
        text="Estimated Budget"
        value={OpenProposal.estimated_budget}
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
};
