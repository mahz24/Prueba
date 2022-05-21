import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacters, getLocation } from "../api";
import CharacterCard from "../components/CharacterCard";
import { getResidentIds } from "../helpers/getResidentIds";

const CharactersByLocation = () => {
  const { location } = useParams();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getLocation(location);
      const ids = getResidentIds(res.data.residents);
      const res2 = await getCharacters(ids);
      setCharacters(res2.data);
    })();
  }, [location]);

  return (
    <div className="row">
      {characters.map((character) => (
        <div className="col-4 mb-3" key={character.id}>
          <CharacterCard
            name={character.name}
            image={character.image}
            createdAt={character.created}
          />
        </div>
      ))}
    </div>
  );
};

export default CharactersByLocation;
