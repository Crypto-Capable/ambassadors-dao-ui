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

const ProfilePage: NextPage = () => {
  const [edit, setEdit] = useState(false);
  console.log(edit);
  return (
    <>
      <ProfileDisplay>
        <Button onClick={() => setEdit((s) => !s)}> Edit Profile</Button>
      </ProfileDisplay>
    </>
  );
};

export default ProfilePage;
