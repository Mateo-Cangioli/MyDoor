import React from "react";

const ConsultorioCard = ({ consultorio, onToggle }) => {
  return (
    <div className="col-md-4 mb-4">
      <div
        className={`card ${consultorio.disponible ? "border-success" : "border-danger"}`}
        onClick={() => onToggle(consultorio.id)}
        style={{ cursor: "pointer" }}
      >
        <div className="card-body">
          <h5 className="card-title">{consultorio.nombre}</h5>
          <p className="card-text">
            Estado:{" "}
            <span className={consultorio.disponible ? "text-success" : "text-danger"}>
              {consultorio.disponible ? "Disponible" : "Ocupado"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsultorioCard;
