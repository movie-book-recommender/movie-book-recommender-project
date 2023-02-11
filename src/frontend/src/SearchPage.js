import axios from 'axios'
import { useState, useEffect} from 'react'
import DisplayMovie from './MovieCarusel'

const SearchPage = () => {
    const [searchResult, setSearchResult] = useState([])

    const [newSearch, setNewSearch] = useState('')

    const handleSearchChange = (event) => (setNewSearch(event.target.value))

    const handleSearch = (event) => {
        event.preventDefault()
        axios
        .get(`http://128.214.253.51:3000/dbsearchmoviesbyname?input=${newSearch}`)
        .then(response => {
            console.log(newSearch)
            setSearchResult(response.data)
            console.log(searchResult.length)
            setNewSearch('')
        })
    }

    return(
      <div class="page-container">
        <h2>Search movies</h2>
        <div>
            <form onSubmit={handleSearch}>
                <label for="search">Search movies </label>
                <input value={newSearch} onChange={handleSearchChange} placeholder="Search movies"/>
            </form>
        </div>
        <div>
          <ul>
            {searchResult.map(movie => <li>{movie.title}</li>)}
          </ul>
        </div>
      </div>
    )
}

  export default SearchPage