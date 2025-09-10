/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { blue } from "react-native-reanimated/lib/typescript/Colors";

const primaryColorLight = '#B3CDE0';
const primaryColorDark = '#012E57';
const secondaryColorLight = '#ffffff';
const secondaryColorDark = '#0047AB';
const highlightColor = '#FFD700';
const colorTextLight = '#151515ff';
const colorTextDark = '#ECEDEE';
const colorTitleLight = '#151515';
const colorTitleDark = '#B3CDE0';
const sloganColor = '#012E57';
const colorDark_01 = '#000000';
const colorLight_01 = '#ffffff';

export const Colors = {
  light: {
    background: colorLight_01,
    text: colorTextLight,
    title: colorTitleLight,
    slogan: sloganColor,
    tint: primaryColorLight,
    icon: primaryColorDark,
    tabIconDefault: 'rgba(1, 46, 87, 0.6)',
    tabIconSelected: primaryColorDark,
    splashBackground: secondaryColorDark,
    splashProgress: colorLight_01,
    splashProgressBg: primaryColorLight,
    highlight: highlightColor,
    textLink: colorTitleDark,
    headerText: primaryColorDark,
    headerBg: colorLight_01,
  },
  dark: {
    background: primaryColorDark,
    text: colorTextDark,
    title: colorTitleDark,
    slogan: sloganColor,
    tint: primaryColorDark,
    icon: primaryColorLight,
    tabIconDefault: 'rgba(179, 205, 224, 0.5)',
    tabIconSelected: primaryColorLight,
    splashBackground: primaryColorDark,
    splashProgress: primaryColorLight,
    splashProgressBg: '#687076',
    highlight: highlightColor,
    textLink: secondaryColorDark,
    headerText : primaryColorLight,
    headerBg: primaryColorDark,
  },
  global: {
    error: '#ff3b30',
    warning: '#ffcc00',
    success: '#4cd964',
    info: secondaryColorDark,
    marker: secondaryColorLight,
    dark: colorDark_01,
    light: colorLight_01
  },
};
