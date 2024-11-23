import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LoggedInUserContext } from "./contexts/loggedInUser";
import {
  updateProfile,
  getOwnerPlants,
  getPlantsSummary,
  postNewOwnerPlants,
  patchPutOwnerPlantsQuantity,
} from "./api";
import PlantCard from "./PlantCard";
import AddPlantModal from "./AddPlantModal";
import SitterProfile from "./SitterProfile";

const Profile = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const savedUserId = localStorage.getItem("user_id");
  const [sucessMsg, setSucessMsg] = useState("");
  const [currentOwnerPlants, setCurrentOwnerPlants] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [allPlantsList, setAllPlantsList] = useState([]);
  const [ownerView, setOwnerView] = useState(true);
  const [profileDetails, setProfileDetails] = useState({
    first_name: loggedInUser.first_name,
    last_name: loggedInUser.last_name,
    email: loggedInUser.email,
    avatar_url: loggedInUser.avatar_url || "",
    password: loggedInUser.password,
    street_address: loggedInUser.street_address || "",
    postcode: loggedInUser.postcode || "",
    city: loggedInUser.city || "",
  });

  useEffect(() => {
    getOwnerPlants(savedUserId)
      .then((plants) => {
        setCurrentOwnerPlants(plants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getPlantsSummary()
      .then((plants) => {
        setAllPlantsList(plants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const postPlantFunc = (newPlantsArr) => {
    newPlantsArr.forEach((plant) => {
      postNewOwnerPlants(plant, loggedInUser.user_id).catch((error) => {
        console.log(error, "Error");
      });
    });
  };

  const onChange = (name, value) => {
    setProfileDetails({
      ...profileDetails,
      [name]: value,
    });
  };

  const handleProfileUpdate = () => {
    updateProfile(profileDetails, loggedInUser.user_id)
      .then((updatedUser) => {
        setSucessMsg("Profile Details Update Successful!");
        setProfileDetails(updatedUser);
        setLoggedInUser(updatedUser);
        setTimeout(() => {
          setSucessMsg("");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePlantUpdate = (plantToUpdate) => {
    patchPutOwnerPlantsQuantity(plantToUpdate, loggedInUser.user_id).catch(
      (error) => {
        console.log(error);
      }
    );
  };

  const handleAddPlants = (selectedPlants) => {
    setCurrentOwnerPlants((prev) => {
      const updatedCurrent = [...prev];
      selectedPlants.forEach((selectedPlant) => {
        const existingPlant = updatedCurrent.find(
          (plant) => plant.plant_id === selectedPlant.plant_id
        );

        if (existingPlant) {
          existingPlant.quantity =
            existingPlant.quantity + selectedPlant.quantity;
          handlePlantUpdate(existingPlant);
        } else {
          updatedCurrent.push({
            ...selectedPlant,
            quantity: selectedPlant.quantity,
          });
          postPlantFunc(selectedPlants);
        }
      });

      return updatedCurrent;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable
        style={[
          styles.switchButton,
          ownerView ? styles.ownerView : styles.sitterView,
        ]}
        onPress={() => setOwnerView(!ownerView)}
      >
        <Text style={styles.switchButtonText}>
          {ownerView ? "Switch to Sitter View" : "Switch to Owner View"}
        </Text>
      </Pressable>

      <Text>{loggedInUser.username}'s Profile Page</Text>
      <Text>Update Profile Information</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          type="text"
          onChangeText={(text) => onChange("first_name", text)}
          placeholder="Enter First Name"
          name="first_name"
          value={profileDetails.first_name}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          type="text"
          onChangeText={(text) => onChange("last_name", text)}
          placeholder="Enter Last Name"
          name="last_name"
          value={profileDetails.last_name}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          type="email"
          onChangeText={(text) => onChange("email", text)}
          placeholder="Enter Email"
          name="email"
          value={profileDetails.email}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Avatar URL:</Text>
        <TextInput
          style={styles.input}
          type="text"
          onChangeText={(text) => onChange("avatar_url", text)}
          placeholder="Enter Avatar URL"
          name="avatar_url"
          value={profileDetails.avatar_url}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          type="password"
          onChangeText={(text) => onChange("password", text)}
          placeholder="Enter Password"
          name="password"
          value={profileDetails.password}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Street Address:</Text>
        <TextInput
          style={styles.input}
          type="text"
          onChangeText={(text) => onChange("street_address", text)}
          placeholder="Enter Street Address"
          name="street_address"
          value={profileDetails.street_address}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Postcode:</Text>
        <TextInput
          style={styles.input}
          type="text"
          onChangeText={(text) => onChange("postcode", text)}
          placeholder="Enter Postcode"
          name="postcode"
          value={profileDetails.postcode}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>City:</Text>
        <TextInput
          style={styles.input}
          type="text"
          onChangeText={(text) => onChange("city", text)}
          placeholder="Enter City"
          name="city"
          value={profileDetails.city}
        />
      </View>
      <Pressable style={styles.button} onPress={handleProfileUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </Pressable>

      <Text>{sucessMsg}</Text>

      {ownerView ? (
        <>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addButtonText}>Add New Plants</Text>
            </TouchableOpacity>
            <AddPlantModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              plants={allPlantsList}
              onAddPlants={handleAddPlants}
              postPlantFunc={postPlantFunc}
            />
          </View>
          {currentOwnerPlants.map((plant) => {
            return (
              <PlantCard
                plant={plant}
                key={plant.plant_id}
                user_id={loggedInUser.user_id}
              />
            );
          })}
        </>
      ) : (
        <SitterProfile />
      )}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  switchButton: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
  },
  switchButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ownerView: {
    backgroundColor: "#4CAF50",
  },
  sitterView: {
    backgroundColor: "#FF5722",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  inputcontainer: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    pointerEvents: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingRight: 50,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    textAlign: "right",
    marginRight: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  successMsg: {
    marginTop: 16,
    color: "#4CAF50",
    textAlign: "center",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  card: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  commonName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scientificName: {
    fontSize: 14,
    color: "#666",
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
