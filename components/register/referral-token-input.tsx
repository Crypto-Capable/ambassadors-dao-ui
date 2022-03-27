import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Button,
  Box,
  useToast,
  Center,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import { useContractContext } from '../../context/contract-context';
import { useRouter } from 'next/router';
import { Tabs } from '../../types';
import { placeholderReferralToken } from '../../util/constants';

export type ReferralTokenInputProps = {
  mustHaveToken?: boolean;
};

// to make the DAO invite only, remove the don't have a referral token option
const ReferralTokenInput: React.FC<ReferralTokenInputProps> = ({
  mustHaveToken,
}) => {
  const [referralToken, setReferralToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const contract = useContractContext()!;
  const { replace } = useRouter();

  const handleSubmit = () => {
    setLoading(true);
    contract.contract
      .register_ambassador({ token: referralToken })
      .then(() => replace(`/dashboard/${Tabs.PROPOSALS}`))
      .catch(() => {
        toast({
          status: 'error',
          description: 'Incorrect referral token',
        });
      })
      .finally(() => setLoading(false));
  };

  const handleSkip = () => {
    setLoading(true);
    contract.contract
      .register_ambassador({ token: null })
      .then(() => replace(`/dashboard/${Tabs.PROPOSALS}`))
      .finally(() => setLoading(false));
  };

  return (
    <Box mt="4" experimental_spaceY="4">
      {loading ? (
        <Center flexDirection="column">
          <Heading>Completing your registration ⌛</Heading>
          <Spinner mt="4" />
        </Center>
      ) : (
        <>
          <FormControl isRequired>
            <FormLabel htmlFor="referralToken">Referral Token</FormLabel>
            <Input
              id="referralToken"
              type="text"
              value={referralToken ?? ''}
              onChange={({ target: { value } }) => setReferralToken(value)}
              placeholder={placeholderReferralToken}
            />
            <FormHelperText>
              {mustHaveToken
                ? 'Enter the referral token you intend to use here'
                : 'If you have a referral token for registration, please enter it here.'}
            </FormHelperText>
          </FormControl>
          <Button mr="4" onClick={handleSubmit}>
            Submit Referral Token
          </Button>
          {!mustHaveToken && (
            <Button variant="outline" onClick={handleSkip}>
              Don&apos;t have a referral token?
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

ReferralTokenInput.defaultProps = {
  mustHaveToken: false,
};

export default ReferralTokenInput;
