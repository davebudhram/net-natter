import React from "react";
import { getPlayerStatsPerGameData, getGameStatsData } from "../server/statsData";
import { getTeamsData } from "../server/teamData";
import { getGameData } from "../server/gameData";
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