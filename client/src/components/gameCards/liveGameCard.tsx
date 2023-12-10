import "./gameCard.css";
import React from "react";
import {IGame} from "../../interfaces/game";

interface GameCardProps {
  game: IGame;
}
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
  status: "live",
  _id: 12940,
};

function LiveGameCard(props: GameCardProps) {
  const {game} = props;

  return (
    <div className='game-card'>
      <div className='game-card-team-logo-row'>
        <img
          className='game-card-team-logo'
          src={game.awayLogo}
          alt={`Logo for ${game.awayTeamName}`}
        />
        <img
          className='game-card-team-logo'
          src={game.homeLogo}
          alt={`Logo for ${game.homeTeamName}`}
        />
      </div>
      <div className='game-card-team-code-row'>
        <div className='game-card-team-code'>{game.awayTeamCode}</div>
        <div className='game-card-at'>@</div>
        <div className='game-card-team-code'>{game.homeTeamCode}</div>
      </div>
      {(game.status === "Finished" || game.status === "live") && (
        <div className='game-card-team-score-row'>
          <div className='game-card-team-score'>{game.awayTeamScore}</div>
          <div className='game-card-team-score'>{game.homeTeamScore}</div>
        </div>
      )}
      {game.status === "live" && (
        <div className='game-card-time-row'>
          <div className='game-card-time'>
            {game.quarter}Q {game.clock}
          </div>
        </div>
      )}
      {(game.status === "Scheduled" || game.status === "Finished") && (
        <div className='text-center mt-2 mb-2'>
          {game.startTime.toLocaleString().replace(/,/g, " -")}
        </div>
      )}

      {/* <div className='game-card-team-code'>{game.awayTeamCode}</div>
      <div className='game-card-team-score'>{game.awayTeamScore}</div> */}
    </div>
  );
}

export default LiveGameCard;
