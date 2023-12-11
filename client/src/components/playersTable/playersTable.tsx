import React from "react";
import { IPlayer } from "../../interfaces/player";
import PlayerCard from "../playerCards/playerCards";

type PlayersTableProps = {
    players: IPlayer[];
  };

function PlayersTable(props: PlayersTableProps) {
    return (
        <div className='d-flex flex-row flex-wrap'>
            {props.players.map((player) => (
                <PlayerCard player={player} />
            ))}
        </div>
    );
}

export default PlayersTable;