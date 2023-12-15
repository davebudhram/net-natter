import "./gameCard.css";
import React from "react";
import {IGame} from "../../interfaces/game";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  game: IGame | undefined;
}

function LiveGameCard(props: GameCardProps) {
  const {game} = props;
  const navigate = useNavigate();

  const handleGameCardClick = () => {
    if (!game) {
      return;
    }
    try {
      navigate(`/game/${game._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='game-card' onClick={handleGameCardClick}>
      {game && (
        <>
          {game.status === "In Play" && (
            <div className='game-card-time-row'>
              <div className='game-card-time'>
                {game.clock ? 
                  game.quarter > 4 ? 
                  'Final' 
                  : 
                  game.quarter + 'Q   ' + game.clock 
                  : game.quarter > 3 ?
                  'Final'
                  : 
                  'End of ' + game.quarter + 'Q'}
              </div>
            </div>
          )}
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
            <div className='game-card-team-code'>{game.homeTeamCode}</div>
          </div>
          {(game.status === "Finished" || game.status === "In Play") && (
            <div className='game-card-team-score-row'>
              <div className='game-card-team-score'>{game.awayTeamScore}</div>
              <div className="game-card-dash"> - </div>
              <div className='game-card-team-score'>{game.homeTeamScore}</div>
            </div>
          )}
          {(game.status === "Scheduled") && (
            <div className='text-center mt-2 mb-2 fs-4'>
              {new Date(game.startTime)
                .toLocaleString()
                .replace(/,/g, " -")
                .replace(":00 ", " ")}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LiveGameCard;
