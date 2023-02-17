import axios from "axios";
import { useState, useEffect } from "react";
import Items from "../Carusel";

const SearchPage = ({ page }) => {
  const [searchResult, setSearchResult] = useState([]);

  const [newSearch, setNewSearch] = useState();

  useEffect(() => {
    axios
      .get(
        `http://128.214.253.51:3000/dbsearch${page}byname?input=${newSearch}`
      )
      .then((response) => {
        setSearchResult(response.data);
      });
  }, [newSearch]);

  const handleSortByReleaseOld = () => {
    const sortedByReleaseNew = [...searchResult].sort(compareRelease);
    setSearchResult(sortedByReleaseNew);
  };

  const handleSortByReleaseNew = () => {
    const sortedByReleaseOld = [...searchResult].sort(compareRelease).reverse();
    setSearchResult(sortedByReleaseOld);
  };

  const handleSortByTitleAsc = () => {
    const sortedByTitleAsc = [...searchResult].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setSearchResult(sortedByTitleAsc);
  };

  const handleSortByTitleDesc = () => {
    const sortedByTitleDesc = [...searchResult]
      .sort((a, b) => a.title.localeCompare(b.title))
      .reverse();
    setSearchResult(sortedByTitleDesc);
  };

  return (
    <div class="page-container">
      <h2>Search {page}</h2>
      <div>
        <form>
          <label>Search {page} </label>
          <input
            value={newSearch}
            onChange={({ target }) => setNewSearch(target.value)}
            placeholder={`Search ${page}`}
          />
        </form>
      </div>
      <div>
        <p>
          Sort by:
          <button onClick={handleSortByReleaseNew}>release newest first</button>
          <button onClick={handleSortByReleaseOld}>release oldest first</button>
          <button onClick={handleSortByTitleAsc}>title A-Z</button>
          <button onClick={handleSortByTitleDesc}>title Z-A</button>
        </p>
      </div>
      <div>{newSearch && <Items items={searchResult} page={page} />}</div>
    </div>
  );
};

export default SearchPage;

function compareRelease(a, b) {
  if (Date.parse(a.releasedate) < Date.parse(b.releasedate)) {
    return -1;
  } else if (Date.parse(a.releasedate) > Date.parse(b.releasedate)) {
    return 1;
  }
  return 0;
}
