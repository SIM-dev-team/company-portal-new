import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/images/ucsc_logo_trans.png'

function Navbar(){
    return(
        <div className="navbar">
            <div className="logo-text"><img src={logo} alt=""className="nav-logo"/>Professional Development Center</div>
            
            <ul>
                <Link to="/"><li>Home</li></Link>
                <Link to="/about"><li>About</li></Link>
                <Link to="/contact"><li>Contact</li></Link>
                <Link to="/profile"><li>Profile</li></Link>
                
            </ul>
        </div>
    );
}

export default Navbar;