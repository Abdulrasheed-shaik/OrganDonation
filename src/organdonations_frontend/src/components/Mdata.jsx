import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { organdonations_backend } from "declarations/organdonations_backend";
import './MatchData.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const Mdata = () => {
  const [donors, setDonors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    const fetchDonorsAndPatients = async () => {
      try {
        const fetchedDonors = await organdonations_backend.getDonors();
        const fetchedPatients = await organdonations_backend.getPatients();
        setDonors(fetchedDonors);
        setPatients(fetchedPatients);
      } catch (error) {
        console.error("Error fetching donors and patients:", error);
      }
    };

    fetchDonorsAndPatients();
  }, []);

  useEffect(() => {
    const findMatches = () => {
      const matched = donors.flatMap(donor => {
        const matchedOrgans = donor.organs.filter(organ => patients.some(patient => patient.organsAffected === organ));
        if (matchedOrgans.length > 0) {
          const matchedPairs = matchedOrgans.map(matchedOrgan => ({
            donor,
            patient: patients.find(patient => patient.organsAffected === matchedOrgan),
            matchedOrgan,
          }));

          // Filter out pairs where blood group does not match
          return matchedPairs.filter(pair => pair.donor.bloodGroup === pair.patient.bloodGroup);
        } else {
          return [];
        }
      });
      setMatchedPairs(matched);
    };
    findMatches();
  }, [donors, patients]);

  return (
    <>
      <div className="but">
        <Link to="/pnav">Back</Link>
      </div>
    
      <div className='donorimage'>
        <img src="donorhero.jpg" alt="image" />
      </div>

      <div className="match-data-container">
        <table className="match-data-table">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Donor Full Name</th>
              <th>Donor Age</th>
              <th>Donor Medical ID</th>
              <th>Donor Contact Number</th>
              <th>Matched Organ</th>
              <th>Donor Blood Group Matched</th>
              <th>Patient Full Name</th>
              <th>Patient Age</th>
              <th>Patient Medical ID</th>
              <th>Patient Contact Number</th>
              <th>Patient Organs Affected</th>
              <th>Patient Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {matchedPairs.length === 0 ? (
              <tr>
                <td colSpan="13">No matches found</td>
              </tr>
            ) : (
              matchedPairs.map((pair, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pair.donor.fullName}</td>
                  <td>{pair.donor.age}</td>
                  <td>{pair.donor.medicalId}</td>
                  <td>{pair.donor.mobileNumber}</td>
                  <td>{pair.matchedOrgan}</td>
                  <td>{pair.donor.bloodGroup}</td>
                  <td>{pair.patient.fullName}</td>
                  <td>{pair.patient.age}</td>
                  <td>{pair.patient.medicalId}</td>
                  <td>{pair.patient.mobileNumber}</td>
                  <td>{pair.patient.organsAffected}</td>
                  <td>{pair.patient.bloodGroup}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Footer />
      </div>
    </>
  );
}

export default Mdata;
