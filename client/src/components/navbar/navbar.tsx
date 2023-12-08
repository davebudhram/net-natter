import React from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";

import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <div className='navbar-item'>
        <button onClick={() => navigate("/home")}>Home</button>
      </div>
      <div className='navbar-item'>
        <button onClick={() => navigate("/account/1")}>Acount</button>
      </div>
    </div>
  );
}

export default Navbar;
