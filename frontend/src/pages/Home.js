import React from "react";
import LocationCard from "../components/LocationCard";
import { useEffect, useState } from "react";
import { getLocations } from "../api";
import { Link } from "react-router-dom";

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getLocations(page);
      if (res.data.info.next) {
        setHasNext(true);
      } else {
        setHasNext(false);
      }
      setLocations(res.data.results);
    })();
  }, [page]);
  return (
    <div>
      <div className="constiner mb-3 col-12">
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
            </div>
          </div>
        </nav>
      </div>

      <div className="row">
        <h1>Where is your character?</h1>
        {locations.map((location) => (
          <div className="col-4 mb-2" key={location.id}>
            <LocationCard
              name={location.name}
              type={location.type}
              dimension={location.dimension}
              residents={location.residents.length}
              id={location.id}
            />
          </div>
        ))}
        <div className="col-12">
          {page > 1 && (
            <button
              className="btn btn-primary"
              onClick={() => {
                setPage((page) => page - 1);
              }}
            >
              Prev
            </button>
          )}

          {hasNext && (
            <button
              className="btn btn-primary"
              onClick={() => {
                setPage((page) => page + 1);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
