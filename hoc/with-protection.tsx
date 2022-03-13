import { Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../context/auth-context';

const withProtection = (Component: React.FC) => {
  const ProtectedComponent: React.FC = (props) => {
    const router = useRouter();
    const { wallet } = useAuthContext();

    if (wallet && !wallet.isSignedIn()) {
      router.replace('/');
      return null;
    } else if (!wallet) {
      return (
        <Center width="100vw" height="100vh">
          <Spinner />
        </Center>
      );
    }

    return <Component {...props} />;
  };

  return ProtectedComponent;
};

export default withProtection;
