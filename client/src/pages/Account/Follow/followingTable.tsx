import React from "react";
import {IUser} from "../../../interfaces/user";
import FollowCard from "./followCard";

type FollowingTableProps = {
  followings: IUser[];
};
function FollowingTable(props: FollowingTableProps) {
  const {followings} = props;

  React.useEffect(() => {}, [followings]);

  return (
    <div>
      <h2>Following Table</h2>
      {followings.map((following, index) => (
        <div key={index}>
          <FollowCard user={following} />
        </div>
      ))}
    </div>
  );
}

export default FollowingTable;
