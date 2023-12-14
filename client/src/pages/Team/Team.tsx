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
import { getTeamStatsData } from "../../services/statsData";
import TeamStatsCard from "../../components/teamStatsCard/teamStatsCard";
import { ITeamStats } from "../../interfaces/stats";
import { useUser } from "../../contexts/UserContext";
import "./Team.css";

function Team() {
    const { teamId } = useParams();
    const { user, updateUserContext }  = useUser();
    const [favoriteTeam, setFavoriteTeam] = useState<boolean>((user && teamId) ? user.favoriteTeamID === parseInt(teamId) : false);
    const [team, setTeam] = useState<ITeam>(); 
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const [games, setGames] = useState<IGame[]>([]);
    const [teamStats, setTeamStats] = useState<ITeamStats>();
    
    useEffect(() => {
        const fetchData = async () => {
            if (!teamId) {
                console.log("No team");
                return;
            }
            console.log(teamId);
            try {
                const teamData = await getSingleTeamData(parseInt(teamId));
                const gamesData = await getIndividualGameTeamData(parseInt(teamId));
                setGames(gamesData);
                setTeam(teamData);

                if (teamData) {
                    const playersData = await getPlayersData(parseInt(teamId), teamData.code.toLowerCase());
                    const teamStatsData = await getTeamStatsData(parseInt(teamId));
                    setPlayers(playersData);
                    setTeamStats(teamStatsData);
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        };
        
        // fetchData();
    }, [teamId]);


    const formatStandings = (rank: number) => {
        switch (rank) {
            case 1:
                return "1st";
            case 2:
                return "2nd";
            case 3:
                return "3rd";
            default:
                return `${rank}th`;
        }
    }

    const handleFavoriteClick = async () => {
        if (!user || !team) {
            alert("You must be logged in to favorite a team");
            return;
        }
        try {
            if (favoriteTeam) {
                await updateUserContext({favoriteTeamID: undefined});
                setFavoriteTeam(false);
            } else {
                await updateUserContext({favoriteTeamID: team._id});
                setFavoriteTeam(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="page">
        {!team && <div>Loading...</div>}
        {team && (
            <>
            <div className="d-flex flex-row team-header-container">
                <img
                className='team-logo'
                src={team.logo}
                alt={'Logo for Team Page'}
                />
                <div className="d-flex flex-column justify-content-between py-4 text-nowrap">
                    <h1 className="team-name-header-text">{team.name} - {team.code}</h1>
                    <h2 className="team-stats-header-text">
                        {favoriteTeam ?
                            <button className="btn btn-outline-dark" onClick={async () => await handleFavoriteClick()}>Unfavorite</button>
                            : 
                            <button className="btn btn-outline-dark" onClick={async () => await handleFavoriteClick()}>Favorite</button>
                        }
                        <span className="mx-3">{team.wins} - {team.losses}</span>
                        <span>
                            {formatStandings(team.rank)} 
                            {' in the '}
                            {team.conference[0].toUpperCase() + team.conference.slice(1)}</span>
                            {'ern Conference'}
                    </h2>
                </div>
            </div>
            <div className='d-flex flex-row'>
                <div className="d-flex flex-column">
                    <TeamStatsCard teamStats={teamStats}/>
                    <TeamGameSchedule games={games} teamId={team._id} />
                </div>
                <div>
                    <h2 className="player-title-text-row"> Players </h2>
                    <PlayersTable players={players} />
                </div>
            </div>
            </>
        )}
        </div>
    );
}
export default Team;