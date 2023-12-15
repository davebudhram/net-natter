import React from "react";
import { IGame } from "../../interfaces/game";
import "./gameCard.css";

interface GameCardProps {
  game: IGame;
}

function GameCard(props: GameCardProps) {
  const {game} = props;
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>
          {game.awayTeamId} @ {game.homeTeamId}
        </h5>
        <h6 className='card-subtitle mb-2 text-muted'>
          {new Date(game.startTime)
                .toLocaleString()
                .replace(/,/g, " -")
                .replace(":00 ", " ")}
        </h6>
        <p className='card-text'>
          {game.awayTeamId} {game.awayTeamScore} - {game.homeTeamId}{" "}
          {game.homeTeamScore}
        </p>
      </div>
    </div>
  );
}

export default GameCard;
