import { NearCertifiedDeveloperReferral } from '../../../types';
import { ItemDetailContainer } from '../item-detail-container';

export type NCDReferralItemProps = {
  item: NearCertifiedDeveloperReferral;
};

export const NCDReferralItem: React.FC<NCDReferralItemProps> = ({ item }) => {
  console.log(item);
  return (
    <>
      <h1>Hello world</h1>
    </>
  );
};
