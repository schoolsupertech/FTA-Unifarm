import { Color } from "../constants/colors";

export const DefaultTheme = {
  flex_1: { flex: 1 },
  scrollContainer: { paddingHorizontal: 10 },

  // SafeAreaView
  root: { flex: 1, backgroundColor: "white" },

  // Background
  bgColor: "white",
  headerBgColor: Color.primaryGreen50,
  cardBgColor: Color.primaryGreen50,

  // Text
  txtColor: "black",

  // Search Bar
  searchbar: {
    colors: {
      elevation: { level3: Color.primaryGreen50 },
      primary: Color.primaryGreen800,
    },
  },

  // Button
  btnBgColor800: Color.primaryGreen800,
  btnColor700: Color.primaryGreen700,

  // Progress Bar
  pgBarColor: Color.brandingError,
};
