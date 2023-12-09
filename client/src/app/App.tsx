import React from "react";
import AppRouter from "../Router";
import "./App.css";
import {UserProvider} from "../contexts/UserContext";

function App() {
  return (
    <div className='App'>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </div>
  );
}

export default App;
