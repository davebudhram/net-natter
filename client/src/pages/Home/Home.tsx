import React, {useState} from "react";
import {IGame} from "../../interfaces/game";
import TeamCard from "../../components/teamCards/teamCard";
import "./Home.css";
import { ITeam } from "../../interfaces/team";


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
      </div>
      <button className='btn btn-secondary'>Press me!</button>
      <div/>
    </div>
  );
}
export default Home;
