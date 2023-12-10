import React, {useState} from "react";
import GameCard from "../../components/gameCards/gameCard";
import {IGame} from "../../interfaces/game";
import LiveGameCard from "../../components/gameCards/liveGameCard";
import "./Home.css";

import {getDateGameData} from "../../services/gameData";

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
function Home() {
  const [liveGames, setLiveGames] = useState<IGame[]>([]);

  return (
    <div className='page'>
      <div className='home-page-header'>Home</div>
      <p>This is the home page</p>
      <h2>Live Games</h2>
      <div className='live-game-row d-flex flex-row flex-wrap'>
        <LiveGameCard game={temp} />
        <LiveGameCard game={temp} />
        <LiveGameCard game={temp} />
        <LiveGameCard game={temp} />
        <LiveGameCard game={temp} />
        <LiveGameCard game={temp} />
        <LiveGameCard game={temp} />
      </div>
      {/* <div className='row'>
        {liveGames.map((game) => (
          <div className='col-sm-4'>
            <GameCard game={game} />
          </div>
        ))}
        <button onClick={async () => await getDateGameData()}> TEST </button>
      </div> */}
      <button className='btn btn-secondary'>Press me!</button>
    </div>
  );
}
export default Home;
