import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacters, getLocation } from "../api";
import CharacterCard from "../components/CharacterCard";
import { getResidentIds } from "../helpers/getResidentIds";
import { Link } from "react-router-dom";

const CharactersByLocation = () => {
  const { location } = useParams();
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [character, setCharacter] = useState({});

  useEffect(() => {
    (async () => {
      const res = await getLocation(location);
      const ids = getResidentIds(res.data.residents);
      const res2 = await getCharacters(ids);
      if (res2.data.length === undefined) {
        setCharacter(res2.data);
      }
      setCharacters(res2.data);
    })();
  }, [location]);
  console.log(character);

  const handleChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  };

  const handlerPrev = () => {
    setCurrentPage(currentPage - 12);
  };

  const handlerNext = () => {
    setCurrentPage(currentPage + 12);
  };

  const filterCharacters = () => {
    if (search.length === 0) {
      return characters.slice(currentPage, currentPage + 12);
    }
    const filtered = characters.filter(
      (char) => char.name.includes(search) || char.created.includes(search)
    );
    return filtered.slice(currentPage, currentPage + 12);
  };

  return (
    <div>
      <div className="container mb-3">
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Rick and Morty App
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Search character"
                  aria-label="Search"
                  onChange={handleChange}
                  value={search}
                />
              </form>
            </div>
          </div>
        </nav>
      </div>
      <div className="row">
        {characters.length === undefined ? (
          <div className="col-3 mb-3" key={character.id}>
            <CharacterCard
              name={character.name}
              image={character.image}
              createdAt={character.created}
            />
          </div>
        ) : (
          filterCharacters().map((character) => (
            <div className="col-3 mb-3" key={character.id}>
              <CharacterCard
                name={character.name}
                image={character.image}
                createdAt={character.created}
              />
            </div>
          ))
        )}
      </div>
      {characters.length > 12 && (
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          {currentPage > 0 && (
            <button
              type="button"
              className="btn btn-primary ml-3"
              onClick={() => handlerPrev()}
            >
              Prev
            </button>
          )}
          {characters.length > currentPage + 5 && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handlerNext()}
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CharactersByLocation;
