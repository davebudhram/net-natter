import "./gameCard.css";
import React from "react";
import {IGame} from "../../interfaces/game";

interface GameCardProps {
  game: IGame | undefined;
}

function LiveGameCard(props: GameCardProps) {
  const {game} = props;

  return (
    <div className='game-card'>
      {game && (
        <>
          <div className='game-card-team-logo-row'>
            <div className='game-card-team-logo-container'>
              <img
                className='game-card-team-logo'
                src={game.awayLogo}
                alt={`Logo for ${game.awayTeamName}`}
              />
            </div>

            <div className='game-card-team-logo-container'>
              <img
                className='game-card-team-logo'
                src={game.homeLogo}
                alt={`Logo for ${game.awayTeamName}`}
              />
            </div>
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
              {new Date(game.startTime)
                .toLocaleString()
                .replace(/,/g, " -")
                .replace(":00 ", " ")}
            </div>
          )}

          {/* <div className='game-card-team-code'>{game.awayTeamCode}</div>
      <div className='game-card-team-score'>{game.awayTeamScore}</div> */}
        </>
      )}
    </div>
  );
}

export default LiveGameCard;
