import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://apex.oracle.com/pls/apex/mindmyplants/api",
});

export const getUserList = () => {
  return apiClient.get("/users").then((users) => {
    return users.data.items;
  });
};

export const registerUser = (newUser) => {
  return apiClient
    .post("/users", newUser)
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      return Promise.reject(response.status);
    });
};

export const updateProfile = (updateData, user_id) => {
  return apiClient
    .post(`/users/${user_id}`, updateData)
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      return Promise.reject(response.status);
    });
};

export const getJobsList = () => {
  return apiClient
    .get("/owners/ads")
    .then((response) => {
      return response.data.items;
    })
    .catch((response) => {
      return Promise.reject(response.status);
    });
};

export const getOwnerPlants = (owner_id) => {
  return apiClient
    .get(`/owners/${owner_id}/plants`)
    .then((response) => {
      return response.data.items;
    })
    .catch((response) => {
      return Promise.reject(response.status);
    });
};

export const getPlantsSummary = () => {
  return apiClient
    .get("/plants_summary")
    .then((response) => {
      return response.data.items;
    })
    .catch((response) => {
      return Promise.reject(response.status);
    });
};

export const getJobById = (owner_id, job_id) => {
  return apiClient
    .get(`/owners/${owner_id}/ads/${job_id}`)
    .then((response) => response.data.items[0]);
};

export default apiClient;
