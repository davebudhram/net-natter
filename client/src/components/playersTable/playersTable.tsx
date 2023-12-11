import React from "react";
import { IPlayer } from "../../interfaces/player";
import PlayerCard from "../playerCards/playerCards";
import { getAllPlayerUserLikesByUser } from "../../services/UserPlayerLikesService";
import { useUser } from "../../contexts/UserContext";

type PlayersTableProps = {
    players: IPlayer[];
  };

function PlayersTable(props: PlayersTableProps) {
    const { user }  = useUser();
    const [likedPlayers, setLikedPlayers] = React.useState<Number[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                return;
            }
            const allLikedPlayers = await getAllPlayerUserLikesByUser(user._id);
            setLikedPlayers(allLikedPlayers);
        };

        fetchData();
    }, [user]);

    return (
        <div className='d-flex flex-row flex-wrap'>
            {props.players.map((player) => (
                <PlayerCard player={player} likedPlayers={likedPlayers} setLikedPlayers={setLikedPlayers}/>
            ))}
        </div>
    );
}

export default PlayersTable;