import React, { useState, useEffect } from 'react';
import './DonorTable.css';
import { organdonations_backend } from "declarations/organdonations_backend";
import { Link } from 'react-router-dom';
import Footer from './Footer';

const DonorTable = () => {
  const [donors, setDonors] = useState([]);
  const [actor, setActor] = useState(organdonations_backend);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const fetchedDonors = await actor.getDonors();
        setDonors(fetchedDonors);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };
    fetchDonors();
  }, []);

  return (
    <>
    <div className="but">
    <Link to="/dnav">Back</Link>
    </div>
    <div className='donors'>
        <img src="donors.jpg" alt="donorimage" />
      </div>

    <table className="donor-table">
      <thead>
        <tr>
          <th>Serial No.</th>
          <th>Full Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Medical ID</th>
          <th>Contact Number</th>
          <th>Blood Group</th>
          <th>Life Status</th>
          <th>Organs</th>
          <th>Height (cm)</th>
          <th>Weight (kg)</th>
        </tr>
      </thead>
      <tbody>
        {donors.map((donor, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{donor.fullName}</td>
            <td>{donor.age}</td>
            <td>{donor.gender}</td>
            <td>{donor.medicalId}</td>
            <td>{donor.mobileNumber}</td>
            <td>{donor.bloodGroup}</td>
            <td>{donor.lifeStatus}</td>
            <td>{donor.organs.join(', ')}</td>
            <td>{donor.height}</td>
            <td>{donor.weight}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Footer />
    </>
  );
};

export default DonorTable;
