import React from 'react';
import { useParams } from 'react-router-dom';

function Player() {
    const { playerId } = useParams();
    return (
        <div>
            <h1>Player</h1>
            <p>This is the player page for player id {playerId}</p>
        </div>
    )
}
export default Player;