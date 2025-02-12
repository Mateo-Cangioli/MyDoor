import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ConsultorioApp = () => {
  const [consultorios, setConsultorios] = useState([
    { id: 1, doctor: "", estado: "disponible" },
    { id: 2, doctor: "", estado: "ocupado" },
    { id: 3, doctor: "", estado: "disponible" },
    { id: 4, doctor: "", estado: "mantenimiento" },
    { id: 5, doctor: "", estado: "disponible" },
    { id: 6, doctor: "", estado: "ocupado" },
    { id: 7, doctor: "", estado: "disponible" },
    { id: 8, doctor: "", estado: "mantenimiento" },
    { id: 9, doctor: "", estado: "disponible" },
    { id: 10, doctor: "", estado: "ocupado" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedConsultorio, setSelectedConsultorio] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [estado, setEstado] = useState("disponible");
  const [filter, setFilter] = useState("todos");

  const handleOpenModal = (id) => {
    const consultorio = consultorios.find((c) => c.id === id);
    setSelectedConsultorio(consultorio);
    setDoctorName(consultorio.doctor);
    setEstado(consultorio.estado);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedConsultorio(null);
    setDoctorName("");
    setEstado("disponible");
  };

  const handleSaveChanges = () => {
    setConsultorios((prev) =>
      prev.map((c) =>
        c.id === selectedConsultorio.id
          ? { ...c, doctor: doctorName, estado }
          : c
      )
    );
    handleCloseModal();
  };

  const handleAddConsultorio = () => {
    const newId = consultorios.length > 0 ? consultorios[consultorios.length - 1].id + 1 : 1;
    setConsultorios([...consultorios, { id: newId, doctor: "", estado: "disponible" }]);
  };

  const handleRemoveConsultorio = (id) => {
    setConsultorios((prev) => prev.filter((c) => c.id !== id));
  };

  const getCardClass = (estado) => {
    switch (estado) {
      case "disponible":
        return "border-success";
      case "ocupado":
        return "border-danger";
      case "mantenimiento":
        return "border-warning";
      default:
        return "border-secondary";
    }
  };

  const getBackgroundClass = (estado) => {
    switch (estado) {
      case "disponible":
        return "bg-success";
      case "ocupado":
        return "bg-danger";
      case "mantenimiento":
        return "bg-warning";
      default:
        return "bg-secondary";
    }
  };

  const getIconClass = (estado) => {
    switch (estado) {
      case "disponible":
        return "bi bi-check-circle-fill text-success";
      case "ocupado":
        return "bi bi-x-circle-fill text-danger";
      case "mantenimiento":
        return "bi bi-tools text-warning";
      default:
        return "bi bi-question-circle-fill text-secondary";
    }
  };

  const filteredConsultorios =
    filter === "todos"
      ? consultorios
      : consultorios.filter((c) => c.estado === filter);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Consultorios</h1>

      <div className="mb-4 text-center">
        <button
          className="btn btn-outline-secondary mx-1"
          onClick={() => setFilter("todos")}
        >
          Todos
        </button>
        <button
          className="btn btn-outline-success mx-1"
          onClick={() => setFilter("disponible")}
        >
          Disponibles
        </button>
        <button
          className="btn btn-outline-danger mx-1"
          onClick={() => setFilter("ocupado")}
        >
          Ocupados
        </button>
        <button
          className="btn btn-outline-warning mx-1"
          onClick={() => setFilter("mantenimiento")}
        >
          Mantenimiento
        </button>
      </div>

      <div className="mb-4 text-center">
        <button className="btn btn-primary mx-1" onClick={handleAddConsultorio}>
          Agregar Consultorio
        </button>
      </div>

      <div className="row">
        {filteredConsultorios.map((consultorio) => (
          <div key={consultorio.id} className="col-md-3 mb-4">
            <div
              className={`card border ${getCardClass(consultorio.estado)} h-100`}
              style={{ backgroundColor: "white" }}
            >
              <div className="card-body text-black">
                <h5 className="card-title">Consultorio {consultorio.id}</h5>
                <p className="card-text">
                  <i className={`${getIconClass(consultorio.estado)} me-2`}></i>
                  {consultorio.doctor
                    ? `Doctor: ${consultorio.doctor}`
                    : "No hay doctor asignado"}
                </p>
                <p className="card-text">Estado: {consultorio.estado}</p>
                <button
                  className={`btn btn-sm ${getBackgroundClass(
                    consultorio.estado
                  )} text-white me-2`}
                  onClick={() => handleOpenModal(consultorio.id)}
                >
                  {consultorio.doctor ? "Editar" : "Asignar"} Información
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveConsultorio(consultorio.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Consultorio {selectedConsultorio.id}</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="doctorName">Nombre del Doctor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="doctorName"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="Ingrese el nombre del doctor"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="estado">Estado</label>
                  <select
                    className="form-control"
                    id="estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  >
                    <option value="disponible">Disponible</option>
                    <option value="ocupado">Ocupado</option>
                    <option value="mantenimiento">En Mantenimiento</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultorioApp;
