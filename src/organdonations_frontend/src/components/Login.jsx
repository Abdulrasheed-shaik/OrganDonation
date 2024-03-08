import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isDonor, setIsDonor] = useState(true); // Initially showing donor signup form
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit form data based on whether it's a donor or patient signup
    if (isDonor) {
      // Handle donor signup
      console.log('Donor Signup:', formData);
      // Show donor registration success alert
      alert('Donor registration successful!');
    } else {
      // Handle patient signup
      console.log('Patient Signup:', formData);
      // Show patient registration success alert
      alert('Patient registration successful!');
    }
    // Clear form fields after submission
    setFormData({
      name: '',
      dob: '',
      gender: ''
    });
  };

  return (
    <div className="signup-container">
      <h2>{isDonor ? 'Donor Signup' : 'Patient Signup'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      <div className="toggle-buttons">
        <button className={isDonor ? 'active' : ''} onClick={() => setIsDonor(true)}>Donor Signup</button>
        <button className={!isDonor ? 'active' : ''} onClick={() => setIsDonor(false)}>Patient Signup</button>
      </div>
    </div>
  );
};

export default Login;
