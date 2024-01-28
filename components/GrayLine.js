import { View } from "react-native";

const GrayLine = () => {
  return (
    <View
      style={{
        borderBottomColor: "gray", // Set the color you want here
        borderBottomWidth: 1, // Set the thickness of the line here
        marginTop: 10, // Optional: spacing above the line
        marginBottom: 10, // Optional: spacing below the line
      }}
    />
  );
};

export default GrayLine;
