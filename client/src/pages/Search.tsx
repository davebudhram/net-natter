import React from "react";
import {useParams} from "react-router-dom";

function Search() {
  const {searchType, searchText} = useParams();
  return (
    <div>
      <h1>Search</h1>
      <p>
        This is the search page for search type {searchType} and search text{" "}
        {searchText}
      </p>
    </div>
  );
}

export default Search;
