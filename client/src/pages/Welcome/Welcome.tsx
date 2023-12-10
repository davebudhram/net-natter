import React from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Welcome.css";
import {useUser} from "../../contexts/UserContext";
import {Role} from "../../interfaces/user";

function Welcome() {
  const {user} = useUser();

  return (
    <div className='page margin-right-100 d-flex flex-column text-center'>
      <h1 className='red mt-5 mb-4'>Welcome!</h1>
      {user && (
        <div className='welcome-logged-in'>
          <h2 className='mb-4'>You are logged in as {user.fullName}</h2>
          <Link to='/home'>
            <button type='button' className='btn btn-outline-dark me-2'>
              Go to Home
            </button>
          </Link>

          <Link to={`/account/${user._id}`}>
            <button type='button' className='btn btn-outline-dark '>
              Go to Account
            </button>
          </Link>
        </div>
      )}
      {!user && (
        <div className='d-flex justify-content-center'>
          <Signin />
          <div className='welcome-vertical-line'></div>
          <Signup />
        </div>
      )}
    </div>
  );
}

function Signin() {
  const {user, logInContext} = useUser();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (email === "" || password === "") {
      alert("Please fill out all fields");
      return;
    }
    try {
      const signInUser = await logInContext(email, password);
      navigate(`/account/${signInUser._id}`);
    } catch (error) {
      alert("Error logging in");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className='w-100 questrial form-group'>
      <h2>Log in</h2>
      <div className='w-50 ms-auto me-auto text-start'>
        <label htmlFor='email' className='mb-1'>
          Email
        </label>
        <br />
        <input
          type='email'
          id='email'
          name='email'
          className='form-control'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <label htmlFor='password' className='mb-1'>
          Password
        </label>
        <br />
        <input
          type='password'
          id='password'
          name='passowrd'
          className='form-control'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button
          type='button'
          className='btn btn-outline-dark'
          onClick={() => handleSignin()}
        >
          Log in
        </button>
      </div>
    </div>
  );
}

export function Signup() {
  const {user, createUserContext} = useUser();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullname] = React.useState("");
  const [role, setRole] = React.useState<Role>("USER");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (email === "" || password === "" || fullName === "") {
      alert("Please fill out all fields");
      return;
    }
    if (role === "ADMIN") {
      alert("Admin registration is not allowed");
      setEmail("");
      setPassword("");
      setFullname("");
      setRole("USER");
      return;
    }

    try {
      const newUser = await createUserContext({
        email,
        password,
        fullName,
        role,
      });
      navigate(`/account/${newUser._id}`);
    } catch (error) {
      alert("Error creating user");
      setEmail("");
      setPassword("");
      setFullname("");
      setRole("USER");
    }
  };

  return (
    <div className='w-100 questrial form-group'>
      <h2>Create Account</h2>
      <div className='w-50 ms-auto me-auto text-start'>
        <label htmlFor='emailSignup' className='mb-1'>
          Email
        </label>
        <br />
        <input
          type='email'
          id='emailSignup'
          name='emailSignup'
          className='form-control'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <label htmlFor='passwordSignup' className='mb-1'>
          Password
        </label>
        <br />
        <input
          type='password'
          id='passwordSignup'
          name='passwordSignup'
          className='form-control'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <label htmlFor='Full Name' className='mb-1'>
          Full Name
        </label>
        <br />
        <input
          type='text'
          id='Full Name'
          name='Full Name'
          className='form-control'
          value={fullName}
          onChange={(event) => setFullname(event.target.value)}
        />
        <br />
        <label htmlFor='Role' className='mb-1'>
          Role
        </label>
        <br />
        <select
          className='form-select'
          aria-label='Default select example'
          value={role}
          onChange={(event) => setRole(event.target.value as Role)}
        >
          <option value='USER'>User</option>
          <option value='ANALYST'>Analyst</option>
          <option value='ADMIN'>Admin</option>
        </select>
        <br />
        <button
          type='button'
          className='btn btn-outline-dark'
          onClick={() => handleRegister()}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Welcome;
