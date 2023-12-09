import React from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./navbar.css";

function Navbar() {
  const [searchType, setSearchType] = React.useState("Team");
  const [searchText, setSearchText] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToHome = () => {
    navigate("/home");
  };

  const navigateToAccount = () => {
    navigate("/account/1");
  };

  return (
    <div className='navbar blue-background'>
      <div className='navbar-home' onClick={() => navigateToHome()}>
        Net Natter
      </div>
      <div className='navbar-search'>
        <InputGroup>
          <input
            type='text'
            className='form-control'
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <DropdownButton
            title={searchType}
            id='input-group-dropdown-2'
            align='end'
            variant='light'
            onSelect={(eventKey) => {
              setSearchType(eventKey || "Team");
            }}
          >
            <Dropdown.Item eventKey='Team'>Team</Dropdown.Item>
            <Dropdown.Item eventKey='Player'>Player</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </div>

      <div className='navbar-account'>
        <button onClick={() => navigateToAccount()}>Acount</button>
      </div>
    </div>
  );
}

export default Navbar;
