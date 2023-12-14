import {IUser} from "../../../interfaces/user";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import "./followCard.css";

type FollowCardProps = {
  user: IUser;
};

function FollowCard(props: FollowCardProps) {
  const {user} = props;

  return (
    <div className='d-flex flex-row align-items-center text-left mb-2'>
      <div className='profile-container'>
        <FontAwesomeIcon icon={faUser} className='' />
      </div>
      <div className=''>{user.fullName}</div>
    </div>
  );
}

export default FollowCard;
