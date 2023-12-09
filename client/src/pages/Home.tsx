import React from "react";
import { getPlayersData } from "../server/playerData";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>This is the home page</p>
      <button onClick={async () => await getPlayersData(1)}> TEST </button>
    </div>
  );
}
export default Home;