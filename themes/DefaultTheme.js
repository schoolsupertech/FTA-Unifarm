import { Colors } from "../constants/colors";

export const DefaultTheme = {
  flex_1: { flex: 1 },
  scrollContainer: { paddingHorizontal: 10, paddingBottom: 20 },

  // Logo
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  // SafeAreaView
  root: { flex: 1, backgroundColor: "white" },

  // Background
  bgColor: "white",
  headerBgColor: Colors.primaryGreen50,
  cardBgColor: Colors.primaryGreen50,

  // LinearGradient
  linearGradient: {
    width: "100%",
    height: "auto",
    padding: 20,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  // ImageBackground
  imgBg: {
    wight: "100%",
    height: "auto",
    margin: 0,
    padding: 0,
  },
  bgImg: {
    margin: 0,
    padding: 0,
    opacity: 0.5,
  },

  // Text
  txtColor: "black",

  // Search Bar
  searchbar: {
    colors: {
      elevation: { level3: Colors.primaryGreen50 },
      primary: Colors.primaryGreen800,
      onSurface: "grey",
    },
  },

  // Button
  btnBgColor800: Colors.primaryGreen800,
  btnColor700: Colors.primaryGreen700,
  btnView: {
    height: 50,
    width: "50%",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    overflow: "visible",
  },

  // Modal
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 4,
  },

  // Progress Bar
  pgBarColor: Colors.brandingError,
};
