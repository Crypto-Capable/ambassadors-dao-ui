import { Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import ProfileDisplay from '../../components/v2/profile-display';
import ProfileEdit from '../../components/v2/profile-edit';

/**
 * Displays the profile page for a user
 * along with the edit functionality
 * @author Pratham Aggarwal
 */
const ProfilePage: NextPage = () => {
  const [edit, setEdit] = useState(false);
  const Show: React.FC = edit === false ? ProfileDisplay : ProfileEdit;

  return (
    <Show>
      <Button onClick={() => setEdit((s) => !s)}>
        {edit === true ? 'Save Profile' : 'Edit Profile'}
      </Button>
    </Show>
  );
};

export default ProfilePage;
