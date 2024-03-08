import React, { useState } from 'react';
import './PatientForm.css'; 
import { createActor, organdonations_backend } from "declarations/organdonations_backend";
import { Link } from 'react-router-dom';
import Footer from './Footer';

const PatientForm = () => {
  const initialFormData = {
    fullName: '',
    age: '',
    gender: '',
    medicalId: '',
    mobileNumber: '',
    bloodGroup: '',
    organsAffected: '',
    height: '',
    weight: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [actor, setActor] = useState(organdonations_backend);

  // Function to generate a random alphanumeric string
  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Function to generate a unique medical ID
  const generateMedicalID = () => {
    return generateRandomString(8); // Adjust the length as needed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.medicalId = generateMedicalID(); // Generate medical ID before submission
      console.log("Submitting patient data:", formData); // Log the data being submitted
      await actor.submitPatient(formData); // Assuming there's a submitPatient function in the backend actor
      console.log("Registration successful!");
      setFormData(initialFormData);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error submitting patient:", error); // Log any errors that occur during submission
      alert("Failed to submit patient. Please try again later.");
    }
  };
  
  return (
    <>
    <div className="but">
    <Link to="/pnav">Back</Link>
    </div>
    <form onSubmit={handleSubmit} className="form-container">
      <label htmlFor="fullName">Full Name:</label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="age">Age:</label>
      <input
        type="number"
        id="age"
        name="age"
        value={formData.age}
        onChange={handleChange}
        min={18}
      />
      <br />
      <label htmlFor="gender">Gender:</label>
      <input
        type="text"
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="mobileNumber">Mobile Number:</label>
      <input
        type="text"
        id="mobileNumber"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="bloodGroup">Blood Group:</label>
      <select
        id="bloodGroup"
        name="bloodGroup"
        value={formData.bloodGroup}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
      <br />
      <label htmlFor="organsAffected">Organs Affected:</label>
      <select
        id="organsAffected"
        name="organsAffected"
        value={formData.organsAffected}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="heart">Heart</option>
        <option value="blood">Blood</option>
        <option value="eye">Eye</option>
        <option value="liver">Liver</option>
        <option value="kidney">Kidney</option>
        <option value="lung">Lung</option>
        <option value="pancreas">Pancreas</option>
        <option value="bonemarrow">Bonemarrow</option>
      </select>
      <br />
      <label htmlFor="height">Height (cm):</label>
      <input
        type="number"
        id="height"
        name="height"
        value={formData.height}
        onChange={handleChange}
        min={0}
      />
      <br />
      <label htmlFor="weight">Weight (kg):</label>
      <input
        type="number"
        id="weight"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        min={0}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
    <Footer />
    </>
  );
};

export default PatientForm;
