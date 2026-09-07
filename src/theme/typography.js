import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
});

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    fontFamily,
  },
  h2: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
    fontFamily,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    fontFamily,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    fontFamily,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    fontFamily,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    fontFamily,
  },
  captionBold: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    fontFamily,
  },
};
