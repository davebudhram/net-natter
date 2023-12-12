import React from "react";
import {IUser} from "../../../interfaces/user";
import {getUserFollowers} from "../../../services/UserService";
import FollowCard from "./followCard";

type FollowerTableProps = {
  followers: IUser[];
};
function FollowerTable(props: FollowerTableProps) {
  const {followers} = props;

  React.useEffect(() => {}, [followers]);

  return (
    <div>
      <h2>Follower Table</h2>
      {followers.map((follower, index) => (
        <div key={index}>
          <FollowCard user={follower} />
        </div>
      ))}
    </div>
  );
}

export default FollowerTable;
