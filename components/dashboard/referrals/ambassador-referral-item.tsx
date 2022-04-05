import { AmbassadorRegistrationReferral } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type AmbassadorReferralItemProps = {
  item: AmbassadorRegistrationReferral;
};

export const AmbassadorReferralItem: React.FC<AmbassadorReferralItemProps> = ({
  item,
}) => (
  <>
    <ItemDetailContainer label="Referrer ID" value={item.referrer_id} />
    <ItemDetailContainer label="Referred ID" value={item.referred_id} />
  </>
);
