import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../Profile.css'; // Import the CSS file
import Profile from '../components/PatientProfile';
import MatchData from '../components/MatchData';
import PatientForm from '../components/PatientForm';
import PatientTable from '../components/PatientTable';



import { organdonations_backend } from "declarations/organdonations_backend";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "declarations/organdonations_backend";
import { Principal } from "@dfinity/principal";

const PatientNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [dob, setDob] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState("");
  const [noofdoc, setNoofdoc] = useState(0);
  const [noofreq, setNoofreq] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  //authentication starts
  const [principal, setPrincipal] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDonor, setIsDonor] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  let authClient;
  let actor;

  async function handleAuthenticated(authClient) {
    setIsConnected(true);
    const identity = await authClient.getIdentity();
    actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    var resp = await actor.isAccountExists();
    console.log(resp);
    if (resp.statusCode == BigInt(200)) {
      setPrincipal(resp.principal.toString());
      if (resp.msg == "null") {
        setLoggedIn(true);
        setIsConnected(true);
      } else if (resp.msg == "donor") {
        setIsConnected(true);
        setIsDonor(true);
        setLoggedIn(true);
      } else {
        setIsConnected(true);
        setIsPatient(true);
        setLoggedIn(true);
      }
    }
    console.log(isConnected, isDonor, isPatient, loggedIn);
  }

  async function handleWalletClick() {
    var authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      authClient.logout();
      window.location.href = "/"; // Redirect to the home page after logout
    } else {
      authClient.login({
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
        identityProvider: process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : `http://localhost:4943?canisterId=${process.env.CANISTER_ID_internet_identity}`,
        onSuccess: async () => {
          handleAuthenticated(authClient);
        },
      });
    }
  }

  async function reconnectWallet() {
    console.log("connec");
    authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      await handleAuthenticated(authClient);
    } else {
      actor = organdonations_backend;
    }
  }

  useEffect(() => {
    async function sendRequest() {
      await reconnectWallet();
      console.log("comple");
      setIsLoading(false);
      var resp = await actor.getPatientDetails();
      console.log(resp);
      if (resp.statusCode == BigInt(200)) {
        var patient = resp.patient[0];
        setDob(patient.dob);
        setName(patient.name);
        setGender(Object.keys(patient.gender)[0]);
        setNoofdoc(patient.donors.length);
        setNoofreq(Number(patient.noofrecords));
      }
    }
    sendRequest();
  }, []);

  // authentication ends

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsBlurred(!isBlurred); // Toggle the blur effect when the menu is opened/closed
  };
  const hamburger_class = isMenuOpen ? 'hamburger hamburger--spring is-active' : 'hamburger hamburger--spring';
  return (
    !isLoading ? (
      <div className="navbar-container profile-body">
        {isPatient ? null : <Navigate to="/" />}
        <nav className="navbar">
          <div className="logo">
            <img src="svglogo.svg" alt="Patient Logo" />
            <span className='nav-heading'>Patient</span>
          </div>
          <div className="profile">
            <Link to="/patientProfile">
              {/*<img src="patient-image.png" alt="Profile Pic" />*/}
            </Link>
            <button className={hamburger_class} type="button" onClick={toggleMenu}>
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </nav>
        <Profile
          principal={principal}
          name={name}
          dob={dob}
          gender={gender}
          donorsVisited={noofdoc}
          NoofRecords={noofreq}
          isBlurred={isBlurred}
        />
        <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className='dropdown-box'>
            <Link className='button' to="/patientForm">Patient Register</Link>
            <Link className='button' to="/patientTable">View Patient List</Link>
            <Link className='button' to="/MatchData">Match Data</Link>
          </div>
          <div className='dropdown-box'>
            <hr />
            <button className='button' onClick={handleWalletClick}>Logout</button>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    )
  );
}

export default PatientNav;
