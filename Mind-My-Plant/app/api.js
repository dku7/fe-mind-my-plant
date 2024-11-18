import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://apex.oracle.com/pls/apex/mindmyplants/api",
});

export const getUserList = () => {
  return apiClient.get("/users").then((users) => {
    return users.data.items;
  });
};
