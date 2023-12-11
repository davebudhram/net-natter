import React from "react";
import "./teamGameSchedule.css";
import { IGame } from "../../interfaces/game";
import LiveGameCard from "../gameCards/liveGameCard";


export type TeamGameScheduleProps = {
  games: IGame[];
};

function TeamGameSchedule(props: TeamGameScheduleProps) { 
    const { games } = props;
    const pastGames = games.filter((game) => game.status === "Finished").reverse();
    const upcomingGame = games.find((game) => game.status === "Scheduled");
    return (
        <div className='d-flex team-table-container flex-wrap'>
            <div className="team-table-title-text"> Game Schedule </div>
            <LiveGameCard game={upcomingGame} />
            {pastGames.map((game) => (
                <LiveGameCard game={game} />
            ))}
        </div>
    );
};

export default TeamGameSchedule;