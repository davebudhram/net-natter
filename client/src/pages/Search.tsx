import React from "react";
import {useParams} from "react-router-dom";
import Comment from "../components/comment/comment";
import {IGameComment} from "../interfaces/gameComment";

const tempComment: IGameComment = {
  userId: "65764eb8587e45742167d6b8",
  userFullName: "Test User",
  gameId: 9000,
  commentText:
    "This is a new comment again again sadadsadsadsa ds adsadsadd dasdsadsadasbdosabdbobdoasbodbsad s sadsafsafsoiafosbaf fsafsafosafiosafioa fsafibsabfoisabfas bioboasbfbaosfbosaibf oasfisaofbsoabfoasb pasbfioasfo",
  date: new Date("2023-12-01T12:00:00.000Z"),
  _id: "65764f0b587e45742167d6c3",
  __v: 0,
};

const tempComment2: IGameComment = {
  userId: "65764eb8587e45742167d6b8",
  userFullName: "Test User",
  gameId: 9000,
  commentText: "This is a new comment again again sadadsadsadsa",
  date: new Date("2023-12-01T12:00:00.000Z"),
  _id: "65764f0b587e45742167d6c3",
  __v: 0,
};
function Search() {
  const {searchType, searchText} = useParams();
  return (
    <div className='page'>
      <h1>Search</h1>
      <p>
        This is the search page for search type {searchType} and search text{" "}
        {searchText}
      </p>
    </div>
  );
}

export default Search;
