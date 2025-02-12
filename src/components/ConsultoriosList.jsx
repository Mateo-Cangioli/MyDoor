import React, { useState } from "react";

const ConsultoriosList = () => {
  // Estado inicial con los 10 consultorios
  const [consultorios, setConsultorios] = useState([
    { id: 1, estado: "libre" },
    { id: 2, estado: "ocupado" },
    { id: 3, estado: "libre" },
    { id: 4, estado: "ocupado" },
    { id: 5, estado: "libre" },
    { id: 6, estado: "libre" },
    { id: 7, estado: "ocupado" },
    { id: 8, estado: "libre" },
    { id: 9, estado: "libre" },
    { id: 10, estado: "ocupado" },
  ]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {consultorios.map((consultorio) => (
        <div
          key={consultorio.id}
          className={`p-4 rounded-xl text-white text-center shadow-lg ${
            consultorio.estado === "libre" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <h2 className="text-xl font-bold">Consultorio {consultorio.id}</h2>
          <p className="capitalize">{consultorio.estado}</p>
        </div>
      ))}
    </div>
  );
};

export default ConsultoriosList;
