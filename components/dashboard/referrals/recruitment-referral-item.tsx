import { RecruitmentReferral } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';
export type RecruitmentRefferalItemProps = {
  item: RecruitmentReferral;
};

export const RecruitmentReferralItem: React.FC<
  RecruitmentRefferalItemProps
> = ({ item }) => {
  return (
    <>
      <ItemDetailContainer text="Referrer ID" value={item.referrer_id} />
      <ItemDetailContainer text="Referred ID" value={item.referred_id} />
    </>
  );
};
