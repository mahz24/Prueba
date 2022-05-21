import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getLocations = async (page = 1) => {
  try {
    return api.get("/location", {
      params: { page },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getLocation = async (id) => {
  try {
    return api.get(`/location/${id}`);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getCharacters = async (ids) => {
  try {
    return api.get(`/character/${ids}`);
  } catch (error) {
    console.log(error);
    return false;
  }
};
