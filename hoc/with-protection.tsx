import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../context/auth-context';

const withProtection = (Component: React.FC) => {
  const WithProtection: React.FC = (props) => {
    const router = useRouter();
    const { wallet } = useAuthContext();

    if (wallet && !wallet.isSignedIn()) {
      router.replace('/');
      return null;
    } else if (!wallet) {
      return <Box>Loading...</Box>;
    }

    return <Component {...props} />;
  };

  return WithProtection;
};

export default withProtection;
