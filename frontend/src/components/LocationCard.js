import React from "react";
import { Link } from "react-router-dom";

const LocationCard = ({ name, type, dimension, residents, id }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {type} - {dimension}
        </h6>
        <p className="card-text">It locations has {residents} residents</p>
        {residents > 0 && (
          <Link to={`/characters/${id}`} className="card-link">
            View characters
          </Link>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
