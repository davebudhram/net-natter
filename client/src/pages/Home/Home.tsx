import React, {useState} from "react";
import GameCard from "../../components/gameCards/gameCard";
import {IGame} from "../../interfaces/game";
import LiveGameCard from "../../components/gameCards/liveGameCard";
import TeamCard from "../../components/teamCards/teamCard";
import "./Home.css";

import {getDateGameData} from "../../services/gameData";
import {getPlayerStatsPerGameData} from "../../services/statsData";
import { getPlayersData } from "../../services/playerData";
import { ITeam } from "../../interfaces/team";

const temp: IGame = {
  arena: "Smoothie King Center",
  awayLogo:
    "https://upload.wikimedia.org/wikipedia/fr/thumb/d/de/Houston_Rockets_logo_2003.png/330px-Houston_Rockets_logo_2003.png",
  awayTeamCode: "HOU",
  awayTeamId: 14,
  awayTeamName: "Houston Rockets",
  awayTeamScore: 20,
  clock: "3:18",
  homeLogo:
    "https://upload.wikimedia.org/wikipedia/fr/thumb/2/21/New_Orleans_Pelicans.png/200px-New_Orleans_Pelicans.png",
  homeTeamCode: "NOP",
  homeTeamId: 23,
  homeTeamName: "New Orleans Pelicans",
  homeTeamScore: 33,
  quarter: 2,
  startTime: new Date("2023-12-24T00:00:00.000Z"),
  status: "Scheduled",
  _id: 12940,
};

const teamTemp: ITeam = {
  _id: 1,
  name: "Atlanta Hawks",
  code: "ATL",
  conference: "east",
  logo: "https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png",
  rank: 10,
  wins: 9,
  losses: 12,
}


function Home() {
  const [liveGames, setLiveGames] = useState<IGame[]>([]);

  return (
    <div className='page'>
      <div className='home-page-header'>Home</div>
      <p>This is the home page</p>
      <h2>Live Games</h2>
      <div className='d-flex flex-row flex-wrap'>
        <TeamCard team={teamTemp} />
        <TeamCard team={teamTemp} />
        <TeamCard team={teamTemp} />
        <TeamCard team={teamTemp} />
        <TeamCard team={teamTemp} />
        <TeamCard team={teamTemp} />
        <TeamCard team={teamTemp} />
        <TeamCard team={teamTemp} />
      </div>
      <div className='row'>
        <button onClick={async () => await getPlayersData(1)}>
          {" "}
          TEST{" "}
        </button>
      </div>
      <button className='btn btn-secondary'>Press me!</button>
      <div/>
    </div>
  );
}
export default Home;
