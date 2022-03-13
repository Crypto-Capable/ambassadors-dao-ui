import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/auth-context';
import { ContractProvider } from '../context/contract-context';
import layouts from '../layouts';
import customTheme from '../theme';

const DefaultLayout: React.FC = ({ children }) => <>{children}</>;

type CustomAppProps = AppProps & {
  Component: {
    layout?: keyof typeof layouts;
  };
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  const Layout = Component.layout ? layouts[Component.layout] : DefaultLayout;

  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <ContractProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContractProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
