import { palette } from "./palette";

const Themes = {
  // Feel free to customize these!
  light: {
    bg: palette.white,
    bgSecondary: palette.muted_beige,
    heading: palette.light_brown,
    text: palette.light_red,
    textSecondary: palette.muted_greige,
    textActivated: palette.light_brown,
    navigation: palette.red,
    border: palette.light_brown,
    shadows: {
      shadowColor: palette.brown,
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowOffset: { width: -1, height: 5 },
    },
  },

  dark: {
    bg: palette.red,
    bgSecondary: palette.muted_red,
    heading: palette.muted_beige,
    text: palette.muted_gray,
    textSecondary: palette.gray,
    textActivated: palette.light_red,
    navigation: palette.red,
    border: palette.light_brown,
    shadows: {
      shadowColor: palette.brown,
      shadowOpacity: 0.4,
      shadowRadius: 5,
      shadowOffset: { width: -1, height: 5 },
    },
  },
};

export default Themes;