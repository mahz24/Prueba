import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters, getLocations } from "../store/actions";

const Home = () => {
  const locations = useSelector((state) => state.locations);
  const characters = useSelector((state) => state.characters);
  const dispatch = useDispatch();

  console.log(locations);
  console.log(characters);

  useEffect(() => {
    dispatch(getLocations("https://rickandmortyapi.com/api/location?page=1"));
  }, [dispatch]);

  useEffect(() => {
    if (locations.length === 126) {
      locations.forEach((location) => {
        location.residents.forEach((resident) => {
          dispatch(getCharacters(resident));
        });
      });
    }
  }, [dispatch, locations]);

  return (
    <div>
      <ol>
        {characters.map((character) => (
          <li>{character.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
