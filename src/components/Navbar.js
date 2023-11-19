import { Link } from "react-router-dom";
import React from 'react'
import './Navbar.css'
const Navabar = ({ children }) => {
    return (
        <div className="loot">
            <div className="cont">
                <p className="app">Notes-Taking Application</p>
                <p >

                    <Link to="/details" id="home">Dasboard</Link>
                </p>
                <p>
                    <Link to="/dashboard" id="home1">CreateNotes</Link>
                </p>
                <p>
                    <Link to="/" id="home1">Logout</Link>
                </p>
            </div>


            <div className='main-content'>
                {children}
            </div>
        </div>
    )
}

export default Navabar