import axios from "axios";
import { useState, useEffect } from "react";
import "./css/App.css";

import Items from "./Carusel";

const Search = ({ page }) => {
  const [searchResult, setSearchResult] = useState();

  const [newSearch, setNewSearch] = useState();
  useEffect(() => {
    axios
      .get(
        `http://128.214.253.51:3000/dbsearch${page}byname?input=${newSearch}`
      )
      .then((response) => {
        setSearchResult(response.data);
      });
    console.log(searchResult);
  }, [newSearch]);

  useEffect(() => {
    setNewSearch("");
  }, [page]);

  return (
    <div>
      <form>
        <label>Search {page} </label>
        <input
          value={newSearch}
          onChange={({ target }) => setNewSearch(target.value)}
          placeholder={`Search ${page}`}
        />
      </form>
      {newSearch && searchResult && <Items items={searchResult} page={page} />}
    </div>
  );
};

export default Search;
