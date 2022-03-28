import { NearCertifiedDeveloperReferral } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type NCDReferralItemProps = {
  item: NearCertifiedDeveloperReferral;
};

export const NCDReferralItem: React.FC<NCDReferralItemProps> = ({ item }) => {
  console.log(item);
  return (
    <>
      <ItemDetailContainer text="Referrer ID" value={item.referrer_id} />
      <ItemDetailContainer text="Referred ID" value={item.referred_id} />
    </>
  );
};
