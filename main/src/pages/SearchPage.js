import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';

import image from '../NoImage.jpg'

const SearchPage = ({ page }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchKey, setSearchKey] = useState("")
  const [newSearch, setNewSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault()
    axios
    .get(`http://128.214.253.51:3000/dbsearch${page}byname?input=${newSearch}`)
    .then(response => {
        console.log(newSearch)
        setSearchResult(response.data)
        setSearchKey(newSearch)
        console.log(searchKey)
        console.log(searchResult.length)
        setNewSearch('')
    })
  }

  const handleSearchChange = (event) => (setNewSearch(event.target.value))

  const handleSortByReleaseOld = () => {
    // ei toimi kirjoille oikein!
    const sortedByReleaseNew = [...searchResult].sort(compareRelease);
    setSearchResult(sortedByReleaseNew);
  };

  const handleSortByReleaseNew = () => {
    // ei toimi kirjoille oikein!!
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

  return(
    <div class="page-container">
      <h2>Search {page}</h2>
      <SearchBar handleSearch={handleSearch} handleSearchChange={handleSearchChange} newSearch={newSearch} />
      <div class="sort-container">
          <p>
              Sort by: 
              <button onClick={handleSortByReleaseNew}>release newest first</button>
              <button onClick={handleSortByReleaseOld}>release oldest first</button>
              <button onClick={handleSortByTitleAsc}>title A-Z</button>
              <button onClick={handleSortByTitleDesc}>title Z-A</button>
          </p>
      </div>
      <SearchResult searchResult={searchResult} searchKey={searchKey} page={page}/>
    </div>
  )
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

const SearchBar = ({ handleSearch, handleSearchChange, newSearch}) => {
  return (
    <div class="search-bar">
      <form onSubmit={handleSearch}>
        <Paper
          sx={{display: 'flex', alignItems: 'center', width: 300 }}
        >
        <InputBase
          sx={{flex: 1, ml: 1}}
          size="small"
          placeholder="Search by title"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleSearchChange}
          value={newSearch}
        />
        <IconButton
          type="submit"
          sx={{ p: '5px' }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        </Paper>
      </form>
    </div>
  )
}

const SearchResult = ({searchResult, searchKey, page}) => {
  if (searchResult.length !== 0 && searchKey !== ""){
    if (page === "movies"){
      return(
        <div class="search-result">
          <h2>Search result for '{searchKey}'</h2>
          <div class="table">
            {searchResult.map(movie => <DisplayMovie key={movie.id} movie={movie} />)}
          </div>
        </div>
      )
    } else {
      return(
        <div class="search-result">
          <h2>Search result for '{searchKey}'</h2>
          <div class="table">
            {searchResult.map(book => <DisplayBook key={book.id} book={book} />)}
          </div>
        </div>
      )
    }
  } else if (searchKey !== ""){
    return(
      <div class="search-result">
        <h2>No result for '{searchKey}'</h2>
      </div>
    )
  }
}

const DisplayMovie = ({movie}) => {
  const genrelist = movie.genres ? movie.genres.split(",") : []
  const releaseYear = movie.releasedate.split(" ")[3]
  let imageSource = `https://image.tmdb.org/t/p/original${movie.posterpath}`
  if(movie.posterpath === null){
      imageSource = image
  }
  return(
    <div class="table-item">
      <div class="table-item-pic">
        <Link to={`/movie/${movie.movieid}`}>
          <img src={imageSource} />
        </Link>
      </div>
      <div class="table-item-info">
        <div class="table-item-title">
          <Link to={`/movie/${movie.movieid}`}>{movie.title}</Link> ({releaseYear})
        </div>
        <div>
          {movie.runtime} min
        </div>
        <div class="table-item-rate">
          Your rate:
        </div>
        <div class="genres">
          {genrelist.map(genre => <div class="genre-badge">{genre}</div>)}
        </div>
      </div>
    </div>
  )
}

const DisplayBook = ({book}) => {
  let imageSource = book.img
  if(imageSource === null){
      imageSource = image
  }
  return(
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
        <div>
          First publish in {book.year}
        </div>
        <div class="table-item-rate">
          Your rate:
        </div>
      </div>
    </div>
  )
}
