import React from "react";
import { useParams } from "react-router-dom";
function Game() {
    const { gameId } = useParams();
    return (
        <div>
            <h1>Game</h1>
            <p>This is the game page for game id {gameId}</p>
        </div>
    );
}

export default Game;