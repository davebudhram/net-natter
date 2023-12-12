import React from "react";
import "./teamStatsCard.css";
import { ITeamStats } from "../../interfaces/stats";

interface TeamStatsCardProps {
  teamStats: ITeamStats | undefined
}

function TeamStatsCard(props: TeamStatsCardProps) {
  const { teamStats } = props;

  return (
    <>
    {teamStats && (
      <div className='team-stats-card'>
        <div className='team-stats-row-card'>
          <div className='team-stats-box-card'>
              <span>Points Per Game</span>
              <span>PPG: {(teamStats.points / teamStats.gamesPlayed).toFixed(1)}</span>
          </div>
          <div className='team-stats-box-card'>
              <span>Field Goal Percentage</span>
              <span>FGP: {teamStats.fgp}</span>
          </div>
        </div>
        <div className='team-stats-row-card'>
          <div className='team-stats-box-card'>
              <span>Assists Per Game</span>
              <span>APG: {(teamStats.assists / teamStats.gamesPlayed).toFixed(1)}</span>
          </div>
          <div className='team-stats-box-card'>
              <span>Rebounds Per Game</span>
              <span>RPG: {(teamStats.totalRebounds / teamStats.gamesPlayed).toFixed(1)}</span>
          </div>
        </div>
        <div className='team-stats-row-card'>
          <div className='team-stats-box-card'>
              <span>Blocks Per Game</span>
              <span>BPG: {(teamStats.points / teamStats.gamesPlayed).toFixed(1)}</span>
          </div>
          <div className='team-stats-box-card'>
              <span>Steals Per Game</span>
              <span>SPG: {(teamStats.steals / teamStats.gamesPlayed).toFixed(1)}</span>
          </div>
        </div>
      </div>
    )
  }
  </>
  );
}
  

export default TeamStatsCard;
