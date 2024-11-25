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

export const postUserJobs = (ownerId, jobBody) => {
  return apiClient.post(`/owners/${ownerId}/ads`, jobBody).then((response) => {
    return response;
  });
};

export const getJobById = (owner_id, job_id) => {
  return apiClient
    .get(`/owners/${owner_id}/ads/${job_id}`)
    .then((response) => response.data.items[0]);
};

export const patchPutOwnerPlants = (plant, user_id, newCareInstructions) => {
  const updatedPlant = {
    owner_id: user_id,
    plant_id: plant.plant_id,
    instructions: newCareInstructions,
    quantity: plant.quantity,
  };
  return apiClient
    .put(`/owners/${user_id}/plants`, updatedPlant)
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      return Promise.reject(response.status);
    });
};

export const patchPutOwnerPlantsQuantity = (plant, user_id) => {
  return apiClient
    .put(`/owners/${user_id}/plants`, plant)
    .then((response) => {
      return response.data;
    })
    .catch((response) => {
      return Promise.reject(response.status);
    });
};

export const postNewOwnerPlants = (arrOfPlants, owner_id) => {
  console.log(arrOfPlants);

  return apiClient
    .post(`/owners/${owner_id}/plants`, arrOfPlants)
    .then((response) => {
      console.log(response, "IN API THEN");
      return response;
    })
    .catch((response) => {
      return Promise.reject(response.status);
    });
};

export const postJobRequest = (sitter_id, job_id) => {
  return apiClient
    .post(`/sitters/${sitter_id}/requests`, { job_id: job_id })
    .then((response) => {
      response;
    });
};

export const deletePlant = (owner_id, plant_id) => {
  return apiClient
    .delete(`/owners/${owner_id}/plants?plant_id=${plant_id}`)
    .catch((response) => {
      return Promise.reject(response.status);
    });
};

export default apiClient;
