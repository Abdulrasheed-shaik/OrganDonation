import React, { useState, useEffect } from 'react';
import './Registerform.css';
import { createActor, organdonations_backend } from "declarations/organdonations_backend";
import DonorNav from './DonorNav';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Registerform = () => {
  const initialFormData = {
    fullName: '',
    age: '',
    gender: '',
    medicalId: '',
    mobileNumber: '',
    bloodGroup: '',
    organs: [],
    height: '',
    weight: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [actor, setActor] = useState(organdonations_backend);
  const [donors, setDonors] = useState([]); // Initialize donors state with an empty array

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
    let medicalID;
    do {
      medicalID = generateRandomString(8); // Adjust the length as needed
    } while (donors.some(donor => donor.medicalId === medicalID)); // Fix the scope of donors
    return medicalID;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          organs: [...formData.organs, value]
        });
      } else {
        setFormData({
          ...formData,
          organs: formData.organs.filter((organ) => organ !== value)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.medicalId = generateMedicalID(); // Generate medical ID before submission
      console.log("Submitting donor data:", formData); // Log the data being submitted
      await actor.submitDonor(formData);
      console.log("Registration successful!");
      setFormData(initialFormData);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error submitting donor:", error); // Log any errors that occur during submission
      alert("Failed to submit donor. Please try again later.");
    }
  };
  
  return (
    <>
    <div className="but">
    <Link to="/dnav">Back</Link>
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
      {/*<label htmlFor="medicalId">Medical ID:</label>
      <input
        type="text"
        id="medicalId"
        name="medicalId"
        value={formData.medicalId}
  onChange={handleChange}*
      />
  <br />*/}
      <label htmlFor="mobileNumber">Contact Number:</label>
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
      <fieldset>
        <legend>Organs:</legend>
        <label>
          <input
            type="checkbox"
            name="organs"
            value="heart"
            checked={formData.organs.includes('heart')}
            onChange={handleChange}
          />
          Heart
        </label>
        <label>
          <input
            type="checkbox"
            name="organs"
            value="blood"
            checked={formData.organs.includes('blood')}
            onChange={handleChange}
          />
          Blood
        </label>
        <label>
          <input
            type="checkbox"
            name="organs"
            value="eye"
            checked={formData.organs.includes('eye')}
            onChange={handleChange}
          />
          Eye
        </label>
        <label>
          <input
            type="checkbox"
            name="organs"
            value="liver"
            checked={formData.organs.includes('liver')}
            onChange={handleChange}
          />
          Liver
        </label>
        <label>
          <input
            type="checkbox"
            name="organs"
            value="kidney"
            checked={formData.organs.includes('kidney')}
            onChange={handleChange}
          />
          Kidney
        </label>
        <label>
          <input
            type="checkbox"
            name="organs"
            value="lung"
            checked={formData.organs.includes('lung')}
            onChange={handleChange}
          />
          Lung
        </label>
        <label>
          <input
            type="checkbox"
            name="organs"
            value="pancreas"
            checked={formData.organs.includes('pancreas')}
            onChange={handleChange}
          />
          Pancreas
        </label>
        <label>
          <input
            type="checkbox"
            name="organs"
            value="bonemarrow"
            checked={formData.organs.includes('bonemarrow')}
            onChange={handleChange}
          />
          Bonemarrow
        </label>
      </fieldset>
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
    <Footer/>
    </>
  );
};

export default Registerform;