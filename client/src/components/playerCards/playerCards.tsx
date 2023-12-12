import React from "react";
import "./playerCard.css";
import { IPlayer } from "../../interfaces/player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {IconDefinition, faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../contexts/UserContext";
import { createUserPlayerLikes, deleteUserPlayerLike } from "../../services/UserPlayerLikesService";

interface PlayerCardProps {
    player: IPlayer;
    likedPlayers: Number[];
    setLikedPlayers: React.Dispatch<React.SetStateAction<Number[]>>;
}

function PlayerCard(props: PlayerCardProps) {
  const { player } = props;
  const { user }  = useUser();
  const [isLiked, setIsLiked] = React.useState<boolean>(props.likedPlayers.includes(player._id));
  const [heartIcon, setHeartIcon] = React.useState<IconDefinition>(faHeartRegular);

  React.useEffect(() => {
    setHeartIcon(isLiked ? faHeartSolid : faHeartRegular);
  }, [isLiked, player._id, props.likedPlayers]);

  const handleHeartClick = async () => {
    if (!user || user.role === "ANALYST" || user.role === "ADMIN") {
      alert("Please log in to like a player");
      return;
    }
    try { 
      if (!isLiked) {
        await createUserPlayerLikes({ userId: user._id, playerId: player._id});
        setIsLiked(true);
      } else {
        await deleteUserPlayerLike(user._id, player._id);
        setIsLiked(false);
      }
    } catch (error) {
      console.log("Error creating user player like:", error);
    }
  };

  return (
    <div className='player-card'>
      <div className='player-card-row'>
        <FontAwesomeIcon className="player-heart-icon-card" icon={heartIcon} onClick={() => handleHeartClick()} />
        <img
          className='player-headshot-card'
          src={player.headShot}
          alt={`Logo for ${player.firstName} ${player.lastName}`}
        />
        <span className="player-jersey-number-text-card"> {player.jerseyNumber} </span>
      </div>
      <div className='player-card-text-row'>
        {player.position.replace(/-/g, "/")} - {player.firstName} {player.lastName}
      </div>
    </div>
  );
}

  

export default PlayerCard;
