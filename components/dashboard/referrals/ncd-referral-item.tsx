import { Link, Text } from '@chakra-ui/react';
import { NearCertifiedDeveloperReferral } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type NCDReferralItemProps = {
  item: NearCertifiedDeveloperReferral;
};

export const NCDReferralItem: React.FC<NCDReferralItemProps> = ({ item }) => (
  <>
    <ItemDetailContainer text="Referrer ID" value={item.referrer_id} />
    <ItemDetailContainer text="Referred ID" value={item.referred_id} />
    <ItemDetailContainer text="Referral Kind" value={item.kind} />
    <Link color="blue.600" isExternal href={item.proof_link}>
      <Text mt={2}> Proof Link</Text>
    </Link>
  </>
);
