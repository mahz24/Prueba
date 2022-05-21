import React from "react";
import LocationCard from "../components/LocationCard";
import { useEffect, useState } from "react";
import { getLocations } from "../api";

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
    <div className="row">
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
  );
};

export default Home;
