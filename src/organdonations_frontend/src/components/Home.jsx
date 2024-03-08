import React, { useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { organdonations_backend } from 'declarations/organdonations_backend';

import Navbar from './Navbar'
import './Home.css'
import Hero from './Hero'
import Footer from './Footer'

const Home = () => {
  return (
    <>
      <Hero 
        cName='hero'
        HeroImg='organbackground.jpg'
        title='Giving life, leaving a legacy.'
        text='Be the hero others never knew they needed.'
      />
      <Footer />
    </>
  )
}

export default Home;
