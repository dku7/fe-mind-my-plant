import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

const PlantCard = ({ plant }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: plant.image_url }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.commonName}>{plant.common_name}</Text>
        <Text style={styles.instructions}>{plant.instructions}</Text>
        <Text style={styles.quantity}>Quantity: {plant.quantity}</Text>
      </View>
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
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    color: "#666",
    marginVertical: 4,
  },
  quantity: {
    fontSize: 14,
    color: "#333",
  },
});

export default PlantCard;
