import React from "react";
import "./playerCard.css";
import { IPlayer } from "../../interfaces/player";

interface PlayerCardProps {
    player: IPlayer;
}

function PlayerCard(props: PlayerCardProps) {
  const { player } = props;
  console.log(player);

  return (
    <div className='player-card'>
      <div className='player-card-row'>
        <img
          className='player-headshot-card'
          src={player.headShot}
          alt={`Logo for ${player.firstName} ${player.lastName}`}
        />
        <span className="player-jersey-number-text-card"> {player.jerseyNumber} </span>
      </div>
      <div className='player-card-text-row'>
        {player.position.replace(/-/g, "/")} - {player.firstName} {player.lastName}
      </div>
    </div>
  );
}

  

export default PlayerCard;
