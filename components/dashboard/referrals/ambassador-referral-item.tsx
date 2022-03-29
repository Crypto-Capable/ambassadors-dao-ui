import { AmbassadorRegistrationReferral } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type AmbassadorReferralItemProps = {
  item: AmbassadorRegistrationReferral;
};

export const AmbassadorReferralItem: React.FC<AmbassadorReferralItemProps> = ({
  item,
}) => (
  <>
    <ItemDetailContainer text="Referrer ID" value={item.referrer_id} />
    <ItemDetailContainer text="Referred ID" value={item.referred_id} />
  </>
);
