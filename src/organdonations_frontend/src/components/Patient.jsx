import React, { useState } from 'react';
import Footer from './Footer';
import PatientForm from './PatientForm';
import PatientTable from './PatientTable';
import "./Patient.css";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [showRegister, setShowRegister] = useState(false); // state for register form visibility
  const [showPatients, setShowPatients] = useState(false); // state for patient table visibility

  const handleRegister = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister); // toggle register form visibility
    setShowPatients(false); // close patient table
  };

  const togglePatients = () => {
    setShowPatients(!showPatients); // toggle patient table visibility
    setShowRegister(false); // close register form
  };

  return (
    <>
      <div className='patient'>
        <ul>
          <li>
            <button className='btn btn-primary' onClick={toggleRegister}>
              Patient Register
            </button>
            <button className='btn btn-secondary' onClick={togglePatients}>
              View Patients
            </button>
          </li>
        </ul>
      </div>
      {showRegister && <PatientForm onRegister={handleRegister} />}
      {showPatients && <PatientTable patients={patients} />}
      <Footer />
    </>
  );
};

export default Patient;
