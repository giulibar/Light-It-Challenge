import React, { useState, useEffect } from "react";
import PatientCard from "./components/patientCard";
import { getPatients, addPatient } from "./services/patientService"; 
import "./App.css";
import AddPatientModal from "./components/addPatientModal"; 

const App = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      setError("Failed to load patients.");
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSubmit = () => {
    fetchPatients(); // Recarga la lista de pacientes después de agregar uno nuevo
    setIsModalOpen(false); // Cierra el modal
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>Patient List</h1>
        <button className="add-patient-btn" onClick={() => setIsModalOpen(true)}>Add Patient</button>
      </div>

      <div className="patient-list">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <PatientCard
              key={patient.id} 
              fullName={patient.fullName}
              document={patient.document}
              email={patient.email}
              phoneNumber={patient.phoneNumber}
            />
          ))
        ) : (
          <p>No patients available</p>
        )}
      </div>

      {isModalOpen && (
        <AddPatientModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handlePatientSubmit}  // Pasa la función aquí
        />
      )}
    </div>
  );
};

export default App;
