import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const customTheme = extendTheme(
  {
    fonts: {
      heading: 'Space Grotesk, sans-serif',
      body: 'Space Grotesk, sans-serif',
    },
  },
  withDefaultColorScheme({ colorScheme: 'cyan' })
);

export default customTheme;
