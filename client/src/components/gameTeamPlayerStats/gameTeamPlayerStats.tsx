import {useState} from "react";
import {IPlayerStats} from "../../interfaces/stats";
import GameTeamPlayerStatTable from "./gameTeamPlayerStatsTable/gameTeamPlayerStatsTable";
import Nav from "react-bootstrap/Nav";

type GameTeamPlayerStatsProps = {
  stats: IPlayerStats[];
  awayTeamId: number;
  homeTeamId: number;
};
function GameTeamPlayerStats(props: GameTeamPlayerStatsProps) {
  const {stats} = props;
  const awayTeamStats = stats.filter(
    (player) => player.teamId === props.awayTeamId
  );
  const homeTeamStats = stats.filter(
    (player) => player.teamId === props.homeTeamId
  );

  const [activeTab, setActiveTab] = useState("away"); // Set the default active tab

  const handleTabSelect = (selectedKey: any) => {
    setActiveTab(selectedKey);
  };

  return (
    <div>
      <h2>Table for Player Stats in Game</h2>
      <Nav variant='tabs' activeKey={activeTab} onSelect={handleTabSelect}>
        <Nav.Item>
          <Nav.Link eventKey='away' className='text-black'>
            Away Team Stats
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='home' className='text-black'>
            Home Team Stats
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "away" && (
        <GameTeamPlayerStatTable stats={awayTeamStats} />
      )}
      {activeTab === "home" && (
        <GameTeamPlayerStatTable stats={homeTeamStats} />
      )}
    </div>
  );
}

export default GameTeamPlayerStats;
