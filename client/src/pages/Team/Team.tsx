import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeamGameSchedule from "../../components/teamGameSchedule/teamGameSchedule";
import PlayersTable from "../../components/playersTable/playersTable";
import { IPlayer } from "../../interfaces/player";
import { ITeam } from "../../interfaces/team";
import { getPlayersData } from "../../services/playerData";
import { IGame } from "../../interfaces/game";
import { getIndividualGameTeamData } from "../../services/gameData";
import { getSingleTeamData } from "../../services/teamData";
import "./Team.css";

function Team() {
    const { teamId } = useParams();
    const [team, setTeam] = useState<ITeam>(); 
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const [games, setGames] = useState<IGame[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            if (teamId) {   
                const teamData = await getSingleTeamData(parseInt(teamId));
                const playersData = await getPlayersData(parseInt(teamId));
                const gamesData = await getIndividualGameTeamData(parseInt(teamId));
                setPlayers(playersData);
                setGames(gamesData);
                setTeam(teamData);
            }
        };
        
        fetchData();
    }, [teamId]);

    return (
        <div>
            <h1 className="team-page-name-text">{team ? team.name: "No Team"}</h1>
            <p>This is the team page for team id {teamId}</p>
            <div className='d-flex flex-row'>
                <TeamGameSchedule games={games} />
                <div>
                    <PlayersTable players={players} />
                </div>
            </div>
        </div>
    );
}
export default Team;