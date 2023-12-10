import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useUser} from "../contexts/UserContext";
function Account() {
  const {accountId} = useParams();
  const {user, logOutContext} = useUser();
  const navigate = useNavigate();

  const handleLogOutButton = () => {
    logOutContext();
    navigate("/home");
  };

  if (user && user._id === accountId) {
    return (
      <div>
        <h1>Account</h1>
        <p>This is your account page</p>
        <p>${user._id}</p>
        <p>${user.fullName}</p>
        <p>${user.email}</p>
        <p>${user.password}</p>
        <button onClick={() => handleLogOutButton()}>Log Out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Account</h1>
      <p>This is the account page for account id {accountId}</p>
    </div>
  );
}

export default Account;
