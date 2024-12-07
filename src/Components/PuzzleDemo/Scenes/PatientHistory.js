import React from "react";
import { useLocation } from "react-router-dom"; // Para obtener los datos pasados desde la navegación
import '../../../Patients.css'; // Importación del archivo CSS

const PatientHistory = () => {
  const location = useLocation();
  const { patient } = location.state || {}; // Aseguramos que el estado contenga datos del paciente

  if (!patient || !patient.history || patient.history.length === 0) {
    return (
      <div className="patient-history-container">
        <h1>No hay historial disponible para este paciente.</h1>
      </div>
    );
  }

  return (
    <div className="patient-history-container">
      <h1>Historial del Paciente: {patient.nombre} {patient.apellido}</h1>
      <table className="patient-history-table">
        <thead>
          <tr>
            <th>Intento</th>
            <th>Fecha</th>
            <th>Duración</th>
            <th>Puntaje</th>
            <th>Errores</th>
            <th>Aciertos</th>
          </tr>
        </thead>
        <tbody>
          {patient.history.map((session, index) => (
            <tr key={index}>
              <td>{session.intento}</td>
              <td>{session.fecha}</td>
              <td>{session.duracion}</td>
              <td>{session.puntaje}</td>
              <td>{session.errores}</td>
              <td>{session.aciertos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistory;
