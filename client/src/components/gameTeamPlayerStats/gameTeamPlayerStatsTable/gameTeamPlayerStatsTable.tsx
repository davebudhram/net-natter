import {IPlayerStats} from "../../../interfaces/stats";
import "./gameTeamPlayerStatsTable.css";

type GameTeamPlayerStatTableProps = {
  stats: IPlayerStats[];
};

function GameTeamPlayerStatTable(props: GameTeamPlayerStatTableProps) {
  const {stats} = props;

  return (
    <div className='table-responsive text-center game-team-player-stats-table'>
      <table className='table table-striped '>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>PTS</th>
            <th scope='col'>FGM/FGA</th>
            <th scope='col'>FGP</th>
            <th scope='col'>FTM/FTA</th>
            <th scope='col'>FTP</th>
            <th scope='col'>TPM/TPA</th>
            <th scope='col'>TPP</th>
            <th scope='col'>OREB</th>
            <th scope='col'>DREB</th>
            <th scope='col'>REB</th>
            <th scope='col'>ASSISTS</th>
            <th scope='col'>STEALS</th>
            <th scope='col'>BLOCKS</th>
            <th scope='col'>FOULS</th>
            <th scope='col'>TURNOVERS</th>
            <th scope='col'>+/-</th>
          </tr>
        </thead>
        <tbody>
          {stats
            .sort((player1, player2) => player2.points - player1.points)
            .map((player, index) => (
              <tr key={index}>
                <td className='text-nowrap'>
                  {player.firstName + " " + player.lastName}
                </td>
                <td>{player.points}</td>
                <td>
                  {player.fgm}/{player.fga}
                </td>
                <td>{player.fgp}</td>
                <td>
                  {player.ftm}/{player.fta}
                </td>
                <td>{player.ftp}</td>
                <td>
                  {player.tpm}/{player.tpa}
                </td>
                <td>{player.tpp}</td>
                <td>{player.offensiveRebounds}</td>
                <td>{player.defensiveRebounds}</td>
                <td>{player.totalRebounds}</td>
                <td>{player.assists}</td>
                <td>{player.steals}</td>
                <td>{player.blocks}</td>
                <td>{player.fouls}</td>
                <td>{player.turnovers}</td>
                <td>{player.plusMinus}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default GameTeamPlayerStatTable;
