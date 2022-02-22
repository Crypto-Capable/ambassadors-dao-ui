import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/auth-context';
import layouts from '../layouts';
import customTheme from '../theme';

const DefaultLayout: React.FC = ({ children }) => <>{children}</>;

function MyApp({
  Component,
  pageProps,
}: AppProps & {
  Component: {
    layout?: keyof typeof layouts;
  };
}) {
  const Layout = Component.layout ? layouts[Component.layout] : DefaultLayout;

  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
