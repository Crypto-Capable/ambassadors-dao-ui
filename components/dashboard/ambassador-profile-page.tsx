import { Box, Center, Flex, IconButton, Spinner, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { EyeSlash, Eye } from 'phosphor-react';
import React, { useState } from 'react';
import { ambassadorProfileAtom } from '../../atoms';

const ReferralTokenView: React.FC<{ token: string }> = ({ token }) => {
  const [view, setView] = useState(false);

  return (
    <Box>
      <Flex mt="8" alignItems="flex-start" justifyContent="space-between">
        <Text>Your referral token</Text>
        <Flex alignItems="flex-end">
          {view && <Text>{token}</Text>}
          <IconButton
            onClick={() => setView((v) => !v)}
            icon={view ? <EyeSlash /> : <Eye />}
            aria-label="toggle view token"
            size="xs"
            variant="outline"
            ml="2"
          />
        </Flex>
      </Flex>
      <Text color="gray.500" fontSize="0.9rem" mt="2">
        Share your referral token and earn 0.5 Near when a Campus Ambassador
        registers using your referral token.
      </Text>
    </Box>
  );
};

const AmbassadorProfilePage = () => {
  const profile = useAtomValue(ambassadorProfileAtom);

  if (!profile) {
    return (
      <Center height="full" width="full">
        <Text>Loading your profile</Text>
        <Spinner mt="4" />
      </Center>
    );
  }

  return (
    <Box>
      <Text>You are ambassador #{profile.id}</Text>
      <ReferralTokenView token={profile.referral_token} />
    </Box>
  );
};

export default AmbassadorProfilePage;
