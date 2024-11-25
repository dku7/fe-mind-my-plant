import { Text, View } from "react-native";
import { LoggedInUserContext } from "./contexts/loggedInUser";
import { useContext, useState, useEffect } from "react";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { updateProfile, getOwnerPlants } from "./api";
import PlantCard from "./PlantCard";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AddPlantModal from "./AddPlantModal";
import { getPlantsSummary } from "./api";
import { postNewOwnerPlants } from "./api";
import { patchPutOwnerPlantsQuantity } from "./api";

const Profile = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const savedUserId = localStorage.getItem("user_id");
  const [sucessMsg, setSucessMsg] = useState("");
  const [currentPlants, setCurrentPlants] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [plants, setPlants] = useState([]);
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
        setCurrentPlants(plants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getPlantsSummary()
      .then((plants) => {
        setPlants(plants);
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

  // const onChange = (e) => {
  //   setProfileDetails({
  //     ...profileDetails,
  //     [e.target.placeholder]: e.target.value,
  //   });
  // };
  const onChange = (name, value) => {
    setProfileDetails({
      ...profileDetails,
      [name]: value,
    });
  };

  const handleProfileUpdate = () => {
    updateProfile(profileDetails, loggedInUser.user_id)
      .then((updatedUser) => {
        setSucessMsg("Update Successful!");
        setProfileDetails(updatedUser);
        setLoggedInUser(updatedUser);
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
    setCurrentPlants((prev) => {
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
    <ScrollView>
      <Text className="font-custom text-xl text-center my-1">{loggedInUser.username}'s Profile Page</Text>

      <Text className="font-custom text-lg my-1 mx-5 mb-5">Update Profile Information</Text>

      <View className="font-custom mx-5">
        <Text className="my-2">First Name:</Text>
        <TextInput
          className="border rounded-md p-1 text-base font-custom"
          type="text"
          onChangeText={(text) => onChange("first_name", text)}
          placeholder="Enter First Name"
          name="first_name"
          value={profileDetails.first_name}
        />
      </View>
      <View className="font-custom mx-5">
        <Text className="my-2">Last Name:</Text>
        <TextInput
          className="border rounded-md p-1 text-base font-custom"
          type="text"
          onChangeText={(text) => onChange("last_name", text)}
          placeholder="Enter Last Name"
          name="last_name"
          value={profileDetails.last_name}
        />
      </View>

      <View className="font-custom mx-5">
        <Text className="my-2">Email:</Text>
        <TextInput
          className="border rounded-md p-1 text-base font-custom"
          type="email"
          onChangeText={(text) => onChange("email", text)}
          placeholder="Enter Email"
          name="email"
          value={profileDetails.email}
        />
      </View>
      <View className="font-custom mx-5">
        <Text className="my-2">Avatar URL:</Text>
        <TextInput
          className="border rounded-md p-1 text-base font-custom"
          type="text"
          onChangeText={(text) => onChange("avatar_url", text)}
          placeholder="Enter Avatar URL"
          name="avatar_url"
          value={profileDetails.avatar_url}
        />
      </View>

      <View className="font-custom mx-5">
        <Text className="my-2">Password:</Text>
        <TextInput
          className="border rounded-md p-1 text-base font-custom"
          type="password"
          onChangeText={(text) => onChange("password", text)}
          placeholder="Enter Password"
          name="password"
          value={profileDetails.password}
          secureTextEntry={true} // Secure input for password
        />
      </View>

      <View className="font-custom mx-5">
        <Text className="my-2">Street Address:</Text>
        <TextInput
          className="border rounded-md p-1 text-base font-custom"
          type="text"
          onChangeText={(text) => onChange("street_address", text)}
          placeholder="Enter Street Address"
          name="street_address"
          value={profileDetails.street_address}
        />
      </View>
      <View className="font-custom mx-5">
        <Text className="my-2">Postcode:</Text>
        <TextInput
          className="border rounded-md p-1 text-base font-custom"
          type="text"
          onChangeText={(text) => onChange("postcode", text)}
          placeholder="Enter Postcode"
          name="postcode"
          value={profileDetails.postcode}
        />
      </View>

      <View className="font-custom mx-5">
        <Text className="my-2">City:</Text>
        <TextInput
          className="border rounded-md p-1 text-base font-custom"
          type="text"
          onChangeText={(text) => onChange("city", text)}
          placeholder="Enter City"
          name="city"
          value={profileDetails.city}
        />
      </View>
      <Pressable className="mx-20 my-3 py-2 border-[#6A994E] rounded-md bg-[#6A994E] text-gray-50 font-bold font-custom shadow-md"
       onPress={handleProfileUpdate}>
        Update
      </Pressable>
    <Text className="font-custom text-lg my-1 mx-5 my-5">Add or remove plants from your profile below:</Text>
      <View>
        <Pressable className="mx-20 my-3 py-2 border-[#6A994E] rounded-md bg-[#6A994E] shadow-md"
          onPress={() => setModalVisible(true)}
        >
          <Text className="mx-10 text-base text-gray-50 font-bold font-custom text-center">Add New Plants</Text>
        </Pressable>
        <AddPlantModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          plants={plants}
          onAddPlants={handleAddPlants}
          postPlantFunc={postPlantFunc}
        />
      </View>
      {currentPlants.map((plant) => {
        return (
          <PlantCard
            plant={plant}
            key={plant.plant_id}
            user_id={loggedInUser.user_id}
          />
        );
      })}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   // justifyContent: "center",
  //   // alignItems: "center",
  //   backgroundColor: "#fff",
  // },
  // inputcontainer: {
  //   flexDirection: "column",
  //   width: "100%",
  //   alignItems: "center",
  //   pointerEvents: "auto",
  // },
  // title: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   marginBottom: 16,
  //   color: "#333",
  //   textAlign: "center",
  // },
  // inputGroup: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 12,
  //   paddingRight: 50,
  // },
  // label: {
  //   flex: 1,
  //   fontSize: 14,
  //   fontWeight: "500",
  //   color: "#555",
  //   textAlign: "right", // Align text to the right
  //   marginRight: 8, // Space between label and input
  // },
  // input: {
  //   backgroundColor: "#fff",
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   borderRadius: 8,
  //   padding: 10,
  //   marginBottom: 12,
  //   fontSize: 16,
  //   color: "#333",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 2,
  //   elevation: 2,
  // },
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
