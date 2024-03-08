import React from 'react'
import { organdonations_backend } from 'declarations/organdonations_backend';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AppRouter from './components/AppRouter';
import Home from './components/Home'
import Donor from './components/Donor'
import Patient from './components/Patient'
import Login from './components/Login'
import Registerform from './components/Registerform';
import DonorTable from './components/DonorTable';
import MatchData from './components/MatchData';
import PatientForm from './components/PatientForm';
import PatientTable from './components/PatientTable';
import DonorNav from './components/DonorNav';
import PatientNav from './components/PatientNav';
import SignUp from './components/SignUp';


const App = () => {
  return (
    <div>
      {/* <AppRouter/> */}

      <Router>
        <React.Fragment>
          <Routes>
            <Route path='/' exacts element={<Home />} />
            <Route path='/donor' exact Component={Donor} />
            <Route path='/patient' exact Component={Patient} />
            <Route path='/MatchData' exact Component={MatchData} />
            <Route path='/login' exact Component={Login} id='login' />
            <Route path='/registerform' exact Component={Registerform} />
            <Route path='/donortable' exact Component={DonorTable} />
            <Route path='/patientForm' exact Component={PatientForm} />
            <Route path='/patientTable' exact Component={PatientTable} />
            <Route path='/signup' exact Component={SignUp} />
            <Route path='/dnav' exact Component={DonorNav} />
            <Route path='/pnav' exact Component={PatientNav} />
          </Routes>
        </React.Fragment> 
      </Router>

    </div>
  );
}

export default App