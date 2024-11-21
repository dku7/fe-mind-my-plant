import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { patchPutOwnerPlants } from "./api";

const PlantCard = ({ plant, user_id }) => {
  const [careInstructions, setCareInstructions] = useState(plant.instructions);
  const hasChanges = careInstructions !== plant.instructions;

  const handleSave = () => {
    patchPutOwnerPlants(plant, user_id, careInstructions).then(
      (response) => {}
    );
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: plant.image_url }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.commonName}>{plant.common_name}</Text>
        <TextInput
          style={styles.instructions}
          type="text"
          onChangeText={setCareInstructions}
          placeholder="Add care instructions"
          name="care_instructions"
          value={careInstructions}
        />
        <Text style={styles.quantity}>Quantity: {plant.quantity}</Text>
      </View>
      {hasChanges && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: "visible",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  commonName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  instructions: {
    fontSize: 14,
    color: "#333", // Darker text color for readability
    marginVertical: 4,
    padding: 0,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  quantity: {
    fontSize: 14,
    color: "#333",
  },
  saveButton: {
    position: "relative",
    bottom: 16,
    right: 16,
    backgroundColor: "#4CAF50",
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    zIndex: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default PlantCard;
