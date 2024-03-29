import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { organdonations_backend } from "declarations/organdonations_backend";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "declarations/organdonations_backend";
import { Principal } from "@dfinity/principal";
import '../SignUp.css';

function SignUp() {
  const [isDonor, setIsDonor] = useState(true);
  const [principal, setPrincipal] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isxDonor, setIsxDonor] = useState(false);
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
        setIsxDonor(true);
        setLoggedIn(true);
      } else {
        setIsConnected(true);
        setIsPatient(true);
        setLoggedIn(true);
      }
    }
  }

  async function handleWalletClick() {
    var authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      authClient.logout();
      window.location.href = "/";
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
    }
    sendRequest();
  }, []);

  const togglePatientType = () => {
    setIsDonor((prevIsDonor) => !prevIsDonor);
  };

  async function ski() {
    var name = document.getElementById("name").value;
    var dob = document.getElementById("date").value;
    var gender = document.getElementById("gender").value;
    var specialization = document.getElementById("specialization").value;
    var g;
    if (gender == 'male') {
      g = { Male: null };
    } else {
      g = { Female: null };
    }
    if (!isConnected) {
      alert("Connect Wallet to continue");
    }
    var authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    var actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    if (isDonor) {
      if ((name == null || name == "") || (dob == null || dob == "") || (gender == null || gender == "") || (specialization == null || specialization == "")) {
        alert("Fill in All Details to Signup.");
        return;
      }
      var resp = await actor.createDonor(name, dob, g, specialization);
      if (resp.statusCode == BigInt(200)) {
        setIsxDonor(true);
      } else {
        alert(resp.msg);
      }

    } else {
      if ((name == null || name == "") || (dob == null || dob == "") || (gender == null || gender == "")) {
        alert("Fill in All Details to Signup.");
        return;
      }
      var resp = await actor.createPatient(name, dob, g);
      if (resp.statusCode == BigInt(200)) {
        setIsPatient(true);
      } else {
        alert(resp.msg);
      }

    }
  }

  return (
    <div className="signup-container">
      {
        isxDonor ? <Navigate to="/dnav" /> : null
      }
      {
        isPatient ? <Navigate to="/pnav"  /> : null
      }
      <div className={`content ${isDonor ? 'left' : 'right'}`}>
        <div className={`left-content ${isDonor ? '' : 'blur'}`}>
          {/*<img
            src="donor-imag.png"
            alt="donor"
            className="image"
    />*/}
          <p className="label">Donor</p>
        </div>
        <label className={`switch ${isDonor ? 'left' : 'right'}`}>
          <input
            type="checkbox"
            className="toggle-button"
            onChange={togglePatientType}
            checked={!isDonor}
          />
          <span className="slider"></span>
        </label>
        <div className={`right-content ${isDonor ? 'blur' : ''}`}>
          {/*<img
            src="patient-image.png"
            alt="patient"
            className="image"
    />*/}
          <p className="label">Patient</p>
        </div>
      </div>
      <div className="signup-form">
        <h2>Sign up as a {isDonor ? 'Donor' : 'patient'}</h2>
        <form>
          <label>
            Fullname:
            <input id='name' type="name" />
          </label>
          <label>
            Date of Birth:
            <input id='date' type='date' />
          </label>
          <label>
            Gender:
            <select id="gender">
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </label>
          <label style={{ display: isDonor ? 'block' : 'none' }}>
            Mobile Number:
            <input id="specialization" type='text' />
          </label>
        </form>
        <button type="submit" onClick={ski} className='btn1'>Sign Up</button>
      </div>
      <ul className="background">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

export default SignUp;
