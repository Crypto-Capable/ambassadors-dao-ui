import {
  Tag,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { Envelope, GithubLogo, Info } from 'phosphor-react';
import { useState } from 'react';
import ProfileDisplay from '../../components/v2/profile-display';
import ProfileEdit from '../../components/v2/profile-edit';

const ProfilePage: NextPage = () => {
  const [edit, setEdit] = useState(false);

  const Show = edit === false ? ProfileDisplay : ProfileEdit;
  return (
    // <Show>
    //   <Button onClick={() => setEdit((s) => !s)}>
    //     {edit === true ? 'Save Profile' : 'Edit Profile'}
    //   </Button>
    // </Show>
    <ProfileEdit>
      <Button onClick={() => setEdit((s) => !s)}>
        {edit === true ? 'Save Profile' : 'Edit Profile'}
      </Button>
    </ProfileEdit>
  );
};

export default ProfilePage;
