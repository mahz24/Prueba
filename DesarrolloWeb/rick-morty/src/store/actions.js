import axios from "axios";

export const actions = {
  setLocations: "SET_LOCATIONS",
  setCharacters: "SET_CHARACTERS",
};

export const setLocations = (locations) => ({
  type: actions.setLocations,
  payload: locations,
});

export const setCharacters = (characters) => ({
  type: actions.setCharacters,
  payload: characters,
});

export const getLocations = (url) => {
  return (dispatch) => {
    axios.get(url).then((res) => {
      dispatch(setLocations(res.data.results));
      if (res.data.info.next) {
        dispatch(getLocations(res.data.info.next));
      }
    });
  };
};

export const getCharacters = (resident) => {
  return (dispatch) => {
    axios.get(resident).then((res) => {
      dispatch(setCharacters(res.data));
    });
  };
};
