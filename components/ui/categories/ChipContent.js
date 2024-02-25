import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

import { Color } from "../../../constants/colors";

function ChipContent({ chipData, chipSelected }) {
  const [chipIsSelected, setChipIsSelected] = useState(false);

  const renderChip = ({ item }) => (
    <Chip
      mode={chipIsSelected ? "flat" : "outlined"}
      selected={item.id == 1 && true}
      selectedColor={Color.primaryGreen800}
      style={
        chipIsSelected
          ? styles.chip
          : [styles.chip, { backgroundColor: Color.primaryGreen100 }]
      }
      onPress={() => setChipIsSelected(!chipIsSelected)}
    >
      {item.title}
    </Chip>
  );

  return (
    <FlatList
      data={chipData}
      renderItem={renderChip}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default ChipContent;

const styles = StyleSheet.create({
  chip: {
    marginRight: 12,
  },
});
