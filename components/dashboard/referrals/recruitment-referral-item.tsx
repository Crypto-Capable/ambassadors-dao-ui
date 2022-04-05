import { RecruitmentReferral } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';
export type RecruitmentRefferalItemProps = {
  item: RecruitmentReferral;
};

export const RecruitmentReferralItem: React.FC<
  RecruitmentRefferalItemProps
> = ({ item }) => (
  <>
    <ItemDetailContainer label="Referrer ID" value={item.referrer_id} />
    <ItemDetailContainer label="Referred ID" value={item.referred_id} />
  </>
);
