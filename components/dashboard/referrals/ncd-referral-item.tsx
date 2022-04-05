import { Link, Text } from '@chakra-ui/react';
import { NearCertifiedDeveloperReferral } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type NCDReferralItemProps = {
  item: NearCertifiedDeveloperReferral;
};

export const NCDReferralItem: React.FC<NCDReferralItemProps> = ({ item }) => (
  <>
    <ItemDetailContainer label="Referrer ID" value={item.referrer_id} />
    <ItemDetailContainer label="Referred ID" value={item.referred_id} />
    <ItemDetailContainer label="Referral Kind" value={item.kind} />
    <Link color="blue.600" isExternal href={item.proof_link}>
      <Text mt={2}> Proof Link</Text>
    </Link>
  </>
);
