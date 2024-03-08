import React, { useState, useEffect } from 'react';
import './PatientTable.css';
import { organdonations_backend } from "declarations/organdonations_backend";
import { Link } from 'react-router-dom';
import Footer from './Footer';


const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [actor, setActor] = useState(organdonations_backend);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const fetchedPatients = await actor.getPatients(); // Assuming there's a getPatients function in the backend actor
        setPatients(fetchedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  return (
    <>
    <div className="but">
    <Link to="/pnav">Back</Link>
    </div>
    <div className='patientimage'>
        <img src="patient.jpg" alt="patientimage" />
      </div>

    <table className="patient-table">
      <thead>
        <tr>
          <th>Serial No.</th>
          <th>Full Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Medical ID</th>
          <th>Contact Number</th>
          <th>Blood Group</th>
          <th>Organs Affected</th>
          <th>Height (cm)</th>
          <th>Weight (kg)</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{patient.fullName}</td>
            <td>{patient.age}</td>
            <td>{patient.gender}</td>
            <td>{patient.medicalId}</td>
            <td>{patient.mobileNumber}</td>
            <td>{patient.bloodGroup}</td>
            <td>{patient.organsAffected}</td>
            <td>{patient.height}</td>
            <td>{patient.weight}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Footer />
    </>
  );
};

export default PatientTable;
