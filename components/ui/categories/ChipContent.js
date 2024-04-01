import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

import { Colors } from "../../../constants/colors";

function ChipContent({ chipData, onChipSelected }) {
  const defaultSelected = chipData.find((item) => {
    return item.id === 1;
  }).id;
  const [selectedProds, setSelectedProds] = useState([]);

  useEffect(() => {
    if (selectedProds && selectedProds.length == 0) {
      setSelectedProds([defaultSelected]);
    } else {
      if (
        selectedProds.includes(defaultSelected) &&
        selectedProds.find((item) => item !== defaultSelected)
      ) {
        setSelectedProds(
          selectedProds.filter((item) => item !== defaultSelected),
        );
      }
    }
    onChipSelected(selectedProds);
  }, [selectedProds]);

  function renderChip(itemData) {
    const item = itemData.item;

    function onChipToggleHandler() {
      if (selectedProds.includes(item.id)) {
        setSelectedProds(
          selectedProds.filter((selectedItem) => selectedItem !== item.id),
        );
      } else {
        if (item.id === defaultSelected) {
          setSelectedProds([]);
        } else {
          setSelectedProds([...selectedProds, item.id]);
        }
      }
    }

    return (
      <Chip
        mode={"outlined"}
        selected={selectedProds.includes(item.id)}
        selectedColor={Colors.primaryGreen800}
        style={[styles.chip, { backgroundColor: '#fff' }]}
        onPress={onChipToggleHandler}
        textStyle={{fontWeight: 'bold'}}
      >
        {item.name}
      </Chip>
    );
  }

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
