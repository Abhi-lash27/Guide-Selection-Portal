import React, { useState } from 'react'
import Head from './Head'
import "./header.css"
import { Link } from 'react-router-dom'
import { FaTimes,FaBars,FaCaretDown } from "react-icons/fa";

const Header = () => {
    const [click, setClick] = useState(false)
  return (
    <div>
        <Head />
        <header className='header-main'>
            <nav className='flexSB-header'>
                <ul className={click ? 'mobile-nav-header' : 'flexSB-header'} onClick={()=> setClick(false)}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/guide-list">Guide List</Link></li>
                    <li><Link to="#">Login<FaCaretDown/></Link>
                    <ul className='submenu-header'>
                        <li><Link to="/admin-login">Admin</Link></li>
                        <li><Link to="/staff-login">Staff</Link></li>
                        <li><Link to="/student-login">Student</Link></li>
                    </ul>
                    </li>
                </ul>
                <div className='start-header'>
                    <div className='button-header'>Get Started</div>
                </div>
                <button className='toggle-header' onClick={()=> setClick(!click)}>
                    {click ? <i className=''><FaTimes/></i>: <i className=''><FaBars/></i>}
                </button>
            </nav>
        </header>
    </div>
  )
}

export default Header