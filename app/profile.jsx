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
  });

  const onChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.placeholder]: e.target.value,
    });
  };

  const handleProfileUpdate = () => {
    updateProfile(profileDetails, loggedInUser.user_id)
      .then((updatedUser) => {
        console.log(updatedUser);
        setSucessMsg("Update Successful!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPlants = (selectedPlants) => {
    setPlants((prev) => [...prev, ...selectedPlants]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text>{loggedInUser.username}'s Profile Page</Text>
      <View style={styles.inputcontainer}>
        <>
          <Text>Update Profile Information</Text>
          <TextInput
            style={styles.input}
            type="text"
            onChange={onChange}
            placeholder="first_name"
            name="first_name"
            value={profileDetails.first_name}
          />
          <TextInput
            style={styles.input}
            type="text"
            onChange={onChange}
            placeholder="last_name"
            name="last_name"
            value={profileDetails.last_name}
          />
          <TextInput
            style={styles.input}
            type="email"
            onChange={onChange}
            placeholder="email"
            name="email"
            value={profileDetails.email}
          />
          <TextInput
            style={styles.input}
            type="text"
            onChange={onChange}
            placeholder="avatar_url"
            name="avatar_url"
            value={profileDetails.avatar_url}
          />
          <TextInput
            style={styles.input}
            type="text"
            onChange={onChange}
            placeholder="password"
            name="password"
            value={profileDetails.password}
          />
          <TextInput
            style={styles.input}
            type="text"
            onChange={onChange}
            placeholder="street_address"
            name="street_address"
            value={profileDetails.street_address}
          />
          <TextInput
            style={styles.input}
            type="text"
            onChange={onChange}
            placeholder="postcode"
            name="postcode"
            value={profileDetails.postcode}
          />
          <TextInput
            style={styles.input}
            type="text"
            onChange={onChange}
            placeholder="city"
            name="city"
            value={profileDetails.city}
          />
          <Pressable onPress={handleProfileUpdate}>
            <Text>Update</Text>
          </Pressable>
          <Text>{sucessMsg}</Text>
        </>
      </View>
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
          plants={plants}
          onAddPlants={handleAddPlants}
        />
      </View>
      {currentPlants.map((plant) => {
        return <PlantCard plant={plant} key={plant.plant_id} />;
      })}
    </ScrollView>
  );
};

export default Profile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     backgroundColor: "#88CC7F",
//   },
// inputcontainer: {
//   flexDirection: "column",
//   width: "100%",
//   alignItems: "center",
//   pointerEvents: "auto",
// },
// input: {
//   flex: 1,
//   borderColor: "black",
//   borderWidth: 1,
//   borderRadius: 5,
//   alignItems: "center",
//   fontSize: 18,
// },
// });

const styles = StyleSheet.create({
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
  input: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    fontSize: 18,
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
