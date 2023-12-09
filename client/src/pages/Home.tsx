import React from "react";
import { getPlayerStatsPerGameData, getGameStatsData } from "../services/statsData";
import { getTeamsData } from "../services/teamData";
import { getGameData } from "../services/gameData";
import { Status } from "../interfaces/game";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>This is the home page</p>
      <button onClick={async () => await getGameStatsData(13776)}> TEST </button>
    </div>
  );
}
export default Home;