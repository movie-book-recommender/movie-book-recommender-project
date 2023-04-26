import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination"

const Table = ({ movies, books }) => {
    const itemsPerPage = 5
    const [moviePagination, setMoviePagination] = useState({
      count: 0,
      from: 0,
      to: itemsPerPage
    })
    const [bookPagination, setBookPagination] = useState({
      count: 0,
      from: 0,
      to: itemsPerPage
    })
    
    let moviesOnPage = movies.slice(moviePagination.from, moviePagination.to)
    let booksOnPage = books.slice(bookPagination.from, bookPagination.to)
  
    useEffect(() => {
      setMoviePagination({...moviePagination, count: movies.length})
      setBookPagination({...bookPagination, count: books.length})
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

    return(
      <div class="result-table">
        <div class="table-left">
          <div class="table-item">
            <h3>Movies</h3>
          </div>
          {moviesOnPage}
          <Pagination count={Math.ceil(moviePagination.count / itemsPerPage)} onChange={handleMoviePageChange} />
        </div>
        <div class="table-right">
          <div class="table-item">
            <h3>Books</h3>
          </div>
          {booksOnPage}
          <Pagination count={Math.ceil(bookPagination.count / itemsPerPage)} onChange={handleBookPageChange} />
        </div>
      </div>
    )
}

export default Table