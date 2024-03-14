import { Colors } from "../constants/Colors";

export const DefaultTheme = {
  flex_1: { flex: 1 },
  scrollContainer: { paddingHorizontal: 10 },

  // SafeAreaView
  root: { flex: 1, backgroundColor: "white" },

  // Background
  bgColor: "white",
  headerBgColor: Colors.primaryGreen50,
  cardBgColor: Colors.primaryGreen50,

  // Text
  txtColor: "black",

  // Search Bar
  searchbar: {
    colors: {
      elevation: { level3: Colors.primaryGreen50 },
      primary: Colors.primaryGreen800,
    },
  },

  // Button
  btnBgColor800: Colors.primaryGreen800,
  btnColor700: Colors.primaryGreen700,

  // Progress Bar
  pgBarColor: Colors.brandingError,
};
