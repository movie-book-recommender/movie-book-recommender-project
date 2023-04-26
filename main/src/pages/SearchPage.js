import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  Divider,
  IconButton,
  InputBase,
  NativeSelect,
  Paper,
} from "@mui/material";

import image from "../assets/NoImage.jpg";
import Table from "../Table";

const SearchPage = () => {
  const [searchResultMovies, setSearchResultMovies] = useState([]);
  const [searchResultBooks, setSearchResultBooks] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const [searchType, setSearchType] = useState("name");

  const movieSearchTypes = ["name", "actor", "director"];
  const bookSearchTypes = ["name", "author"];

  const handleSearch = (event) => {
    event.preventDefault();

    if (movieSearchTypes.includes(searchType)) {
      axios
        .get(
          `http://128.214.253.51:3000/dbsearchmoviesby${searchType}?input=${newSearch}`
        )
        .then((response) => {
          setSearchResultMovies(response.data);
        });
    } else {
      setSearchResultMovies([]);
    }

    if (bookSearchTypes.includes(searchType)) {
      axios
        .get(
          `http://128.214.253.51:3000/dbsearchbooksby${searchType}?input=${newSearch}`
        )
        .then((response) => {
          setSearchResultBooks(response.data);
        });
    } else {
      setSearchResultBooks([]);
    }

    setSearchKey(newSearch);
    setNewSearch("");
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSortByReleaseOld = () => {
    const sortedByReleaseNewMovies = [...searchResultMovies].sort(
      compareReleaseMovies
    );
    setSearchResultMovies(sortedByReleaseNewMovies);
    const sortedByReleaseNewBooks = [...searchResultBooks].sort(
      compareReleaseBooks
    );
    setSearchResultBooks(sortedByReleaseNewBooks);
  };

  const handleSortByReleaseNew = () => {
    const sortedByReleaseOldMovies = [...searchResultMovies]
      .sort(compareReleaseMovies)
      .reverse();
    setSearchResultMovies(sortedByReleaseOldMovies);
    const sortedByReleaseOldBooks = [...searchResultBooks]
      .sort(compareReleaseBooks)
      .reverse();
    setSearchResultBooks(sortedByReleaseOldBooks);
  };

  const handleSortByTitleAsc = () => {
    const sortedByTitleAscMovies = [...searchResultMovies].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setSearchResultMovies(sortedByTitleAscMovies);
    const sortedByTitleAscBooks = [...searchResultBooks].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setSearchResultBooks(sortedByTitleAscBooks);
  };

  const handleSortByTitleDesc = () => {
    const sortedByTitleDescMovies = [...searchResultMovies]
      .sort((a, b) => a.title.localeCompare(b.title))
      .reverse();
    setSearchResultMovies(sortedByTitleDescMovies);
    const sortedByTitleDescBooks = [...searchResultBooks]
      .sort((a, b) => a.title.localeCompare(b.title))
      .reverse();
    setSearchResultBooks(sortedByTitleDescBooks);
  };

  return (
    <div class="page-container">
      <h2>Search movies and books</h2>
      <SearchBar
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        handleSearchTypeChange={handleSearchTypeChange}
        newSearch={newSearch}
        searchType={searchType}
      />
      <div class="sort-container">
        <p>
          Sort by:
          <Link
            class="sort show-more-less"
            onClick={handleSortByReleaseNew}
          >
            release newest first
          </Link>
          <Link
            class="sort show-more-less"
            onClick={handleSortByReleaseOld}
          >
            release oldest first
          </Link>
          <Link
            class="sort show-more-less"
            onClick={handleSortByTitleAsc}
          >
            title A-Z
          </Link>
          <Link
            class="sort show-more-less"
            onClick={handleSortByTitleDesc}
          >
            title Z-A
          </Link>
        </p>
      </div>
      <SearchResult
        searchResultMovies={searchResultMovies}
        searchResultBooks={searchResultBooks}
        searchKey={searchKey}
      />
    </div>
  );
};

export default SearchPage;

function compareReleaseMovies(a, b) {
  if (Date.parse(a.releasedate) < Date.parse(b.releasedate)) {
    return -1;
  } else if (Date.parse(a.releasedate) > Date.parse(b.releasedate)) {
    return 1;
  }
  return 0;
}

function compareReleaseBooks(a, b) {
  if (a.year < b.year) {
    return -1;
  } else if (a.year > b.year) {
    return 1;
  }
  return 0;
}

const SearchBar = ({
  handleSearch,
  handleSearchChange,
  handleSearchTypeChange,
  newSearch,
  searchType,
}) => {
  return (
    <div class="search-bar">
      <form onSubmit={handleSearch}>
        <Paper sx={{ display: "flex", alignItems: "center", width: 500 }}>
          <NativeSelect
            value={searchType}
            disableUnderline
            sx={{ ml: 1 }}
            onChange={handleSearchTypeChange}
          >
            <option value="name">title</option>
            <option value="author">author</option>
            <option>actor</option>
            <option>director</option>
          </NativeSelect>
          <Divider orientation="vertical" flexItem />
          <InputBase
            sx={{ flex: 1, ml: 1 }}
            size="small"
            placeholder="Search from library"
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearchChange}
            value={newSearch}
          />
          <IconButton type="submit" sx={{ p: "5px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
    </div>
  );
};

const SearchResult = ({ searchResultMovies, searchResultBooks, searchKey }) => {
  if (
    (searchResultMovies.length !== 0 || searchResultBooks.length !== 0) &&
    searchKey !== ""
  ) {
    let movies = searchResultMovies.map((movie) => (
      <DisplayMovie key={movie.id} movie={movie} />
    ));
    let books = searchResultBooks.map((book) => (
      <DisplayBook key={book.id} book={book} />
    ));
    return (
      <div class="search-result">
        <h2>Search result for '{searchKey}'</h2>
        <Table movies={movies} books={books} />
      </div>
    );
  } else if (searchKey !== "") {
    return (
      <div class="search-result">
        <h2>No result for '{searchKey}'</h2>
      </div>
    );
  }
};

const DisplayMovie = ({ movie }) => {
  const genrelist = movie.genres ? movie.genres.split(",") : [];
  const releaseYear = movie.releasedate ? movie.releasedate.split(" ")[3] : "-";
  let imageSource = `https://image.tmdb.org/t/p/original${movie.posterpath}`;
  if (movie.posterpath === null) {
    imageSource = image;
  }
  return (
    <div class="table-item">
      <div class="table-item-pic">
        <Link to={`/movie/${movie.movieid}`}>
          <img src={imageSource} />
        </Link>
      </div>
      <div class="table-item-info">
        <div class="table-item-title">
          <Link to={`/movie/${movie.movieid}`}>{movie.title}</Link> (
          {releaseYear})
        </div>
        <div>{movie.runtime} min</div>
        <div class="genres">
          {genrelist.map((genre) => (
            <div class="genre-badge">{genre}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DisplayBook = ({ book }) => {
  let imageSource = book.img;
  if (imageSource === null) {
    imageSource = image;
  }
  return (
    <div class="table-item">
      <div class="table-item-pic">
        <Link to={`/book/${book.item_id}`}>
          <img src={imageSource} />
        </Link>
      </div>
      <div class="table-item-info">
        <div class="table-item-title">
          <Link to={`/book/${book.item_id}`}>{book.title}</Link>
        </div>
        <div>Published in {book.year}</div>
        <div class="table-item-rate">Your rate:</div>
      </div>
    </div>
  );
};
