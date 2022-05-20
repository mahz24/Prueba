import { actions } from "./actions";

const INITIAL_STATE = {
  locations: [],
  characters: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.setLocations:
      return {
        ...state,
        locations: [...state.locations.concat(action.payload)],
      };

    case actions.setCharacters:
      return {
        ...state,
        characters: [...state.characters, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
