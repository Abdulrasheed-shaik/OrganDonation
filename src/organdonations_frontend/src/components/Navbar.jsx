import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../public/svglogo.svg'
import navbg from '../../public/navbg.jpeg'
import { Link, NavLink } from 'react-router-dom'
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
 const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <section className='navbarsection'>
      <header className='header'>
        <nav>
          <img src={logo} alt="" className='logo'/>
          <div className="menu" onClick={() => {
            setMenuOpen(!menuOpen);
          }}>
          <TbGridDots className="icon" />
          </div>
          <ul className={menuOpen ? "open" : ""}>
           <li className='navItems'>
             <NavLink to="/" className='navLinks'>Home</NavLink>
           </li>
           <li className='navItems'>
             <NavLink to="/donor" className='navLinks'>Donor</NavLink>
           </li>
           <li className='navItems'>
             <NavLink to="/patient" className='navLinks'>Patient</NavLink>
            </li>
           <li className='navItems'>
             <NavLink to="/MatchData" className='navLinks'>MatchedData</NavLink>
            </li>
            <li className='navItems'>
              <NavLink to="/login" className='navLinks' id="connect">Login</NavLink>
            </li>
          </ul>
            
        </nav>
        
      </header>
    </section>
  )
}

export default Navbar