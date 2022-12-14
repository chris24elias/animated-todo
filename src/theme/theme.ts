import { extendTheme } from 'native-base';

const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 40,
};

const Colors = {
  white: '#ffffff',
  black: '#000000',
  grey: '#cccccc',
  primary: '#0375FF',
  border: '#EDF0FC',
  darkBorder: '#8595C6',
  text: '#394063',
};

const theme = extendTheme({
  colors: Colors,
  space: Spacing,

  components: {
    Text: {
      defaultProps: {
        color: 'text',
      },
      variants: {
        header: {
          fontWeight: 'bold',
          fontSize: 34,
          lineHeight: 42.5,
          // color: "black",
        },
        subheader: {
          fontWeight: '600',
          fontSize: 24,
          lineHeight: 36,
          // color: "black",
        },
        body: {
          fontSize: 16,
          lineHeight: 24,
          // color: "black",
        },
      },
    },
  },
});

type CustomThemeType = typeof theme;

/* eslint-disable */
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

export default theme;
