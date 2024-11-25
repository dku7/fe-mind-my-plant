import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Pressable, TextInput } from "react-native-gesture-handler";
import {
  deletePlant,
  patchPutOwnerPlants,
  patchPutOwnerPlantsQuantity,
} from "./api";

const PlantCard = ({ plant, user_id }) => {
  const [careInstructions, setCareInstructions] = useState(plant.instructions);
  const hasChanges = careInstructions !== plant.instructions;

  const handleSave = () => {
    patchPutOwnerPlants(plant, user_id, careInstructions).then(
      (response) => {}
    );
  };

  const [removePlantCount, setRemovePlantCount] = useState(0);
  const [reloadPage, setReloadPage] = useState(0);

  function decreaseQuantity() {
    let quantityVal = plant.quantity - removePlantCount;
    const newPlant = { plant_id: plant.plant_id, quantity: quantityVal };
    patchPutOwnerPlantsQuantity(newPlant, user_id);
    plant.quantity = quantityVal;
    setRemovePlantCount(0);
  }

  const removeDecrease = () => {
    let newRemovePlantCount = removePlantCount - 1;
    if (newRemovePlantCount < 0) {
      console.log("better idea would be good");
    } else {
      setRemovePlantCount(newRemovePlantCount);
    }
  };
  const removeIncrease = () => {
    if (removePlantCount + 1 <= plant.quantity) {
      let newRemovePlantCount = removePlantCount + 1;
      setRemovePlantCount(newRemovePlantCount);
    } else {
      console.log("still need a better idea");
    }
  };

  const handleDelete = () => {
    deletePlant(user_id, plant.plant_id).then(() => {
      let newReloadPage = reloadPage + 1;
      setReloadPage(newReloadPage);
    });
  };

  useEffect(() => {
    router.push("/");
    router.push("/profile");
  }, [reloadPage]);

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
        <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
          <Text>Remove</Text>
        </TouchableOpacity>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              removeDecrease();
            }}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{removePlantCount}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              removeIncrease();
            }}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        {plant.quantity === 1 && (
          <TouchableOpacity style={styles.saveButton} onPress={handleDelete}>
            <Text style={styles.saveButtonText}>Delete</Text>
          </TouchableOpacity>
        )}
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
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default PlantCard;
