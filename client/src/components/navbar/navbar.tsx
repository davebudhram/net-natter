import React from "react";
import {useNavigate} from "react-router-dom";
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import {useUser} from "../../contexts/UserContext";
import {sign} from "crypto";

function Navbar() {
  const {user, signedIn} = useUser();
  const navigate = useNavigate();
  library.add(faMagnifyingGlass);

  const navigateToHome = () => {
    navigate("/home");
  };

  const handlePressSearch = () => {
    navigate(`/search`);
  };

  React.useEffect(() => {}, [signedIn]);

  return (
    <div className='navbar red-background'>
      <div className='navbar-home' onClick={() => navigateToHome()}>
        Net Natter
      </div>
      {/* <div className='navbar-search'>
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
      </div> */}
      <button
        className='btn btn-outline-white navbar-search-icon-box bg-white me-3'
        onClick={() => handlePressSearch()}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>

      {signedIn && (
        <button
          className='btn btn-outline-white bg-white margin-right-100'
          onClick={() => navigate(`/account/${user?._id}`)}
        >
          Account
        </button>
      )}

      {!signedIn && (
        <button
          className='btn btn-outline-white bg-white margin-right-100'
          onClick={() => navigate(`/welcome`)}
        >
          Sign in
        </button>
      )}
    </div>
  );
}

export default Navbar;
