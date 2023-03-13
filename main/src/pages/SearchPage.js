import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Pagination, Paper } from "@mui/material"

import image from '../NoImage.jpg'

const SearchPage = () => {
  const [searchResultMovies, setSearchResultMovies] = useState([])
  const [searchResultBooks, setSearchResultBooks] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [newSearch, setNewSearch] = useState("")


  const handleSearch = (event) => {
    event.preventDefault()

    axios
    .get(`http://128.214.253.51:3000/dbsearchmoviesbyname?input=${newSearch}`)
    .then(response => {
        setSearchResultMovies(response.data)
    })

    axios
    .get(`http://128.214.253.51:3000/dbsearchbooksbyname?input=${newSearch}`)
    .then(response => {
        setSearchResultBooks(response.data)
        setSearchKey(newSearch)
        setNewSearch('')

    })
  }

  const handleSearchChange = (event) => (setNewSearch(event.target.value))

  const handleSortByReleaseOld = () => {
    const sortedByReleaseNewMovies = [...searchResultMovies].sort(compareReleaseMovies);
    setSearchResultMovies(sortedByReleaseNewMovies);
    const sortedByReleaseNewBooks = [...searchResultBooks].sort(compareReleaseBooks)
    setSearchResultBooks(sortedByReleaseNewBooks)
  };

  const handleSortByReleaseNew = () => {
    const sortedByReleaseOldMovies = [...searchResultMovies].sort(compareReleaseMovies).reverse();
    setSearchResultMovies(sortedByReleaseOldMovies);
    const sortedByReleaseOldBooks = [...searchResultBooks].sort(compareReleaseBooks).reverse();
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

  return(
    <div class="page-container">
      <h2>Search movies and books</h2>
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
      <SearchResult searchResultMovies={searchResultMovies} searchResultBooks={searchResultBooks} searchKey={searchKey} />
    </div>
  )
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

const SearchResult = ({searchResultMovies, searchResultBooks, searchKey}) => {
  const itemsPerPage = 5
  const [moviePagination, setMoviePagination] = useState({
    movies: 0,
    from: 0,
    to: itemsPerPage
  })
  const [bookPagination, setBookPagination] = useState({
    books: 0,
    from: 0,
    to: itemsPerPage
  })

  let moviesOnPage = searchResultMovies.slice(moviePagination.from, moviePagination.to)
  let booksOnPage = searchResultBooks.slice(bookPagination.from, bookPagination.to)

  useEffect(() => {
    setMoviePagination({...moviePagination, movies: searchResultMovies.length})
    setBookPagination({...bookPagination, books: searchResultBooks.length})
  })

  const handleMoviePageChange = (event, page) => {
    const from = (page - 1) * itemsPerPage
    const to = (page - 1) * itemsPerPage + itemsPerPage
    setMoviePagination({...moviePagination, from: from, to: to})
  }

  const handleBookPageChange = (event, page) => {
    const from = (page - 1) * itemsPerPage
    const to = (page - 1) * itemsPerPage + itemsPerPage
    setBookPagination({...bookPagination, from: from, to: to})
  }

  if ((searchResultMovies.length !== 0 || searchResultBooks.length !==0) && searchKey !== ""){
    return(
      <div class="search-result">
        <h2>Search result for '{searchKey}'</h2>
        <div class="result-table">
          <div class="table-left">
            <div class="table-item">
              <h3>Movies</h3>
            </div>
            {moviesOnPage.map(movie => <DisplayMovie key={movie.id} movie={movie} />)}
            <Pagination count={Math.ceil(moviePagination.movies / itemsPerPage)} onChange={handleMoviePageChange} />
          </div>
          <div class="table-right">
          <div class="table-item">
              <h3>Books</h3>
            </div>
            {booksOnPage.map(book => <DisplayBook key={book.id} book={book} />)}
            <Pagination count={Math.ceil(bookPagination.books / itemsPerPage)} onChange={handleBookPageChange} />
          </div>
        </div>
      </div>
    )
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
