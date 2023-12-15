import React from "react";
import "./teamGameSchedule.css";
import { IGame } from "../../interfaces/game";
import { useNavigate } from "react-router-dom";


export type TeamGameScheduleProps = {
  games: IGame[];
  teamId: number;
};

function TeamGameSchedule(props: TeamGameScheduleProps) { 
    const { games, teamId } = props;
    const navigate = useNavigate();
    const pastGames = games.filter((game) => game.status === "Finished").reverse();
    const upcomingGame = games.find((game) => game.status === "Scheduled");

    const handleGameClick = (gameId: number) => {
        try {
          navigate(`/game/${gameId}`);
        } catch (error) {
          console.log(error);
        }
      };


    return (
        <div className='team-table-container flex-wrap'>
            <div className="table-responsive">
                <table className="table mb-0">
                <thead className="team-table-title-text">
                    <tr>
                        <th>
                            Game Schedule
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {upcomingGame && (
                        <tr key={upcomingGame._id}>
                            <td>
                                <div className="team-table-upcoming-game-container">
                                    <div className="mx-1">
                                    {upcomingGame.homeTeamId === teamId ? (
                                        <div>
                                        vs <img className='team-table-logo-text mx-1' src={upcomingGame.awayLogo} alt={`Logo for ${upcomingGame.awayTeamName}`} />
                                        </div>
                                    ) : (
                                        <div>
                                            @ <img className='team-table-logo-text mx-1' src={upcomingGame.homeLogo} alt={`Logo for ${upcomingGame.homeTeamName}`} />
                                        </div>                                    
                                    )}
                                    </div>
                                    <div>
                                        <div className="d-flex flex-column mx-1">
                                            <div className="text-end">{new Date(upcomingGame.startTime).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })}</div>
                                            <div>{new Date(upcomingGame.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}
                    {pastGames.map((game) => (
                    <tr key={game._id}>
                        <td className="team-table-past-game-item">
                            <div className="team-table-past-game-container" onClick={() => handleGameClick(game._id)}>
                                <div className="mx-1">
                                {game.homeTeamId === teamId ? (
                                    <div>
                                    vs <img className='team-table-logo-text mx-1' src={game.awayLogo} alt={`Logo for ${game.awayTeamName}`} />
                                    </div>
                                ) : (
                                    <div>
                                        @ <img className='team-table-logo-text mx-1' src={game.homeLogo} alt={`Logo for ${game.homeTeamName}`} />
                                    </div>                                    
                                )}
                                </div>
                                <div>
                                    <div className="d-flex flex-column mx-1">
                                    {(game.homeTeamId === teamId && game.homeTeamScore > game.awayTeamScore) ? (
                                        <div>
                                            <span className="text-success fw-bold mx-2">W</span>
                                            {game.homeTeamScore} - {game.awayTeamScore}
                                        </div>
                                    ) : (
                                        <div>
                                            <span className="text-danger fw-bold mx-2">L</span>                                   
                                            {game.awayTeamScore} - {game.homeTeamScore}
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamGameSchedule;