import React, {useState} from "react";
import GameCard from "../../components/gameCard/gameCard";
import {IGame} from "../../interfaces/game";
import "./Home.css";
function Home() {
  const [liveGames, setLiveGames] = useState<IGame[]>([]);

  return (
    <div className='page'>
      <div className='home-page-header'>Home</div>
      <p>This is the home page</p>
      <h2>Live Games</h2>
      <div className='row'>
        {liveGames.map((game) => (
          <div className='col-sm-4'>
            <GameCard game={game} />
          </div>
        ))}
      </div>
      <button className='btn btn-secondary'>Press me!</button>
    </div>
  );
}
export default Home;
