import React from "react";
import "./teamGameSchedule.css";
import { IGame } from "../../interfaces/game";
import LiveGameCard from "../gameCards/liveGameCard";

const gametemp: IGame = {
    _id: 12490,
    startTime: new Date("2023-10-10T23:30:00.000Z"),
    arena: "State Farm Arena",
    homeTeamId: 1,
    awayTeamId: 7,
    homeTeamName: "Atlanta Hawks",
    awayTeamName: "Cleaveland Cavaliers",
    homeTeamScore: 108,
    awayTeamScore: 107,
    homeTeamCode: "ATL",
    awayTeamCode: "CLE",
    homeLogo: "https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png",
    awayLogo: "https://upload.wikimedia.org/wikipedia/fr/thumb/0/06/Cavs_de_Cleveland_logo_2017.png/150px-Cavs_de_Cleveland_logo_2017.png",
    quarter: 4,
    status: "Finished",
    clock: "",
};
  

export type TeamGameScheduleProps = {
  games: IGame[];
};

function TeamGameSchedule(props: TeamGameScheduleProps) {
    return (
        <div className='d-flex flex-row team-table-container flex-wrap'>
            <div className="team-table-title-text"> Game Schedule </div>
            {props.games.map((game) => (
                <LiveGameCard game={game} />
            ))}
        </div>
    );
};

export default TeamGameSchedule;