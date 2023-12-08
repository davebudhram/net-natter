import React from "react";
import { getTeamsData } from "../server/teamData";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>This is the home page</p>
      <button onClick={async () => await getTeamsData()}> TEST </button>
    </div>
  );
}
export default Home;