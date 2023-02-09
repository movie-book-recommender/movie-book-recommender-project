import axios from 'axios'
import { useState } from 'react'

const Search = () => {
    const [searchResult, setSearchResult] = useState([])

    const [newSearch, setNewSearch] = useState('')

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }

    const handleSearch = (event) => {
        event.preventDefault()
        const search = axios
        .get(`http://128.214.253.51:3000/dbsearchmoviesbyname?input=${newSearch}`)
        .then(response => {
            setSearchResult(response.data)
        })
        setSearchResult(search)
        setNewSearch('')
        console.log(searchResult)
    }

    return(
        <form onSubmit={handleSearch}>
            <label for="search">Search movies </label>
            <input value={newSearch} onChange={handleSearchChange} placeholder="Search movies"/>
            <button type="submit" value="submit">Search</button>
        </form>
    )
}

export default Search
