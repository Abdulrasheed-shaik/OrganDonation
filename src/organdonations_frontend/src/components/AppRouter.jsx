import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter

import Home from './Home';
import Donor from './Donor';
import Patient from './Patient';
import SignUp from './SignUp';
import Registerform from './Registerform';
import DonorTable from './DonorTable';
import MatchData from './MatchData';
import PatientForm from './PatientForm';
import PatientTable from './PatientTable';
import DonorProfile from './DonorProfile.jsx';
import PatientProfile from './PatientProfile.jsx';

const AppRouter = () => {
  return (
    <BrowserRouter> {/* Wrap your Routes inside BrowserRouter */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/donor' element={<Donor />} />
        <Route path='/patient' element={<Patient />} />
        <Route path='/MatchData' element={<MatchData />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/registerform' element={<Registerform />} />
        <Route path='/donortable' element={<DonorTable />} />
        <Route path='/patientform' element={<PatientForm />} />
        <Route path='/patienttable' element={<PatientTable />} />
        <Route path='/donorProfile' element={<DonorProfile />} />
        <Route path='/patientProfile' element={<PatientProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
