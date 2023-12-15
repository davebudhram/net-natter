import {IGameTeamStats} from "../../interfaces/stats";
import React from "react";
import "./gameTeamStats.css";
const temp: IGameTeamStats = {
  gameId: 12940,
  teamId: 23,
  fgm: 0,
  fga: 0,
  fgp: "1",
  ftm: 0,
  fta: 0,
  ftp: "133",
  tpm: 0,
  tpa: 0,
  tpp: "30%",
  offensiveRebounds: 0,
  defensiveRebounds: 0,
  totalRebounds: 0,
  assists: 0,
  steals: 0,
  blocks: 0,
  fouls: 0,
  plusMinus: "-4",
  turnovers: 0,
  points: 90,
};

export type GameTeamStatsProps = {
  awayTeamStats: IGameTeamStats;
  homeTeamStats: IGameTeamStats;
};

function GameTeamStats(props: GameTeamStatsProps) {
  const {awayTeamStats, homeTeamStats} = props;
  return (
    <div className='team-stats ps-2 pe-2 text-white'>
      <h1>Game Stats</h1>
      <div>
        <div className='team-stats-header justify-content-between'>
          <div>Home Team</div>
          <div>Away Team</div>
        </div>
        <div className='d-flex justify-content-between'>
          <div>
            {awayTeamStats.fgm}/{awayTeamStats.fga}
          </div>
          <div>Field Goals</div>
          <div>
            {homeTeamStats.fgm}/{homeTeamStats.fga}
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <div>{(awayTeamStats.fgm / awayTeamStats.fga * 100).toFixed(1)} </div>
          <div>Field Goals %</div>
          <div>{(homeTeamStats.fgm / awayTeamStats.fga * 100).toFixed(1)} </div>
        </div>
        <br />
        <div className='d-flex justify-content-between'>
          <div>
            {awayTeamStats.ftm}/{awayTeamStats.fta}
          </div>
          <div>Free Throws</div>
          <div>
            {homeTeamStats.ftm}/{homeTeamStats.fta}
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <div>{awayTeamStats.ftp}</div>
          <div>Free Throws %</div>
          <div>{homeTeamStats.ftp}</div>
        </div>
        <br />
        <div className='d-flex justify-content-between'>
          <div>
            {awayTeamStats.tpm}/{awayTeamStats.tpa}
          </div>
          <div>Three Pointers</div>
          <div>
            {homeTeamStats.tpm}/{homeTeamStats.tpa}
          </div>
        </div>
        <div className='d-flex justify-content-between'>
          <div>{awayTeamStats.tpp}</div>
          <div>Three Pointers %</div>
          <div>{homeTeamStats.tpp}</div>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <div>{awayTeamStats.offensiveRebounds}</div>
          <div>Offensive Rebounds</div>
          <div>{homeTeamStats.offensiveRebounds}</div>
        </div>
        <div className='d-flex justify-content-between'>
          <div>{awayTeamStats.defensiveRebounds}</div>
          <div>Defensive Rebounds</div>
          <div>{homeTeamStats.defensiveRebounds}</div>
        </div>
        <div className='d-flex justify-content-between'>
          <div>{awayTeamStats.totalRebounds}</div>
          <div>Rebounds</div>
          <div>{homeTeamStats.totalRebounds}</div>
        </div>
        <br />
        <div className='d-flex justify-content-between'>
          <div>{awayTeamStats.assists}</div>
          <div>Assists</div>
          <div>{homeTeamStats.assists}</div>
        </div>
        <br />
        <div className='d-flex justify-content-between'>
          <div>{awayTeamStats.steals}</div>
          <div>Steals</div>
          <div>{homeTeamStats.steals}</div>
        </div>
        <br />
        <div className='d-flex justify-content-between'>
          <div>{awayTeamStats.blocks}</div>
          <div>Blocks</div>
          <div>{homeTeamStats.blocks}</div>
        </div>
        <br />

        <div className='d-flex justify-content-between'>
          <div>{awayTeamStats.turnovers}</div>
          <div>Turnovers</div>
          <div>{homeTeamStats.turnovers}</div>
        </div>
        <br />
        <div className='d-flex justify-content-between'>
          <div>{awayTeamStats.fouls}</div>
          <div>Fouls</div>
          <div>{homeTeamStats.fouls}</div>
        </div>
      </div>
    </div>
  );
}

export default GameTeamStats;
