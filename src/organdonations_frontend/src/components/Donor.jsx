import React, { useState } from 'react';
import Footer from './Footer';
import Registerform from './Registerform';
import DonorTable from './DonorTable';
import './Donor.css';

const Donor = () => {
  const [donors, setDonors] = useState([]);
  const [showRegister, setShowRegister] = useState(false); // state for register form visibility
  const [showDonors, setShowDonors] = useState(false); // state for donor table visibility

  const handleRegister = (newDonor) => {
    setDonors([...donors, newDonor]);
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister); // Toggle register form visibility
    setShowDonors(false); // Close donor table
  };

  const toggleDonors = () => {
    setShowDonors(!showDonors); // Toggle donor table visibility
    setShowRegister(false); // Close register form
  };

  return (
    <>
      <div className='donorimage'>
        <img src="donorhero.jpg" alt="donorimage" />
      </div>
      <div className='donor'>
        <ul>
          <li>
            <button className='btn btn-primary' onClick={toggleRegister}>
              Donor Register
            </button>
            <button className='btn btn-secondary' onClick={toggleDonors}>
              View Donors
            </button>
          </li>
        </ul>
      </div>
      {showRegister && <Registerform onRegister={handleRegister} />}
      {showDonors && <DonorTable donors={donors} />}
      <Footer />
    </>
  );
};

export default Donor;
