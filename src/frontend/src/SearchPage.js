import axios from 'axios'
import { useState } from 'react'
import { Link } from "react-router-dom"

import image from './NoImage.jpg'

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

    /*const handleSort = (event) => {
        const types = {
          releaseNew: handleSortByReleaseNew(),
          releaseOld: handleSortByReleaseOld(),
          titleAsc: handleSortByTitleAsc(),
          titleDesc: handleSortByTitleAsc(),
        }
        const type = event.target.value
        console.log('sort search', type)
        if (type === 'releaseNew') {
            types.releaseNew
        } else if (type === 'releaseOld') {
            types.releaseOld
        } else if (type === 'titleAsc') {
            types.titleAsc
        } else {
            types.titleDesc
        }
    }*/

    const handleSortByReleaseOld = () => {
        const sortedByReleaseNew = [...searchResult].sort(compareRelease)
        setSearchResult(sortedByReleaseNew)
        console.log(searchResult)
    }

    const handleSortByReleaseNew = () => {
        const sortedByReleaseOld = [...searchResult].sort(compareRelease).reverse()
        setSearchResult(sortedByReleaseOld)
        console.log(searchResult)
    }

    const handleSortByTitleAsc = () => {
        const sortedByTitleAsc = [...searchResult].sort((a, b) => a.title.localeCompare(b.title))
        setSearchResult(sortedByTitleAsc)
        console.log(searchResult)
    }

    const handleSortByTitleDesc = () => {
        const sortedByTitleDesc = [...searchResult].sort((a, b) => a.title.localeCompare(b.title)).reverse()
        setSearchResult(sortedByTitleDesc)
        console.log(searchResult)
    }

    return(
      <div class="page-container">
        <h2>Search movies</h2>
        <div>
            <form onSubmit={handleSearch}>
                <label>Search movies </label>
                <input value={newSearch} onChange={handleSearchChange} placeholder="Search movies"/>
            </form>
        </div>
        <div>
            <p>
                Sort by: 
                <button onClick={handleSortByReleaseNew}>release newest first</button>
                <button onClick={handleSortByReleaseOld}>release oldest first</button>
                <button onClick={handleSortByTitleAsc}>title A-Z</button>
                <button onClick={handleSortByTitleDesc}>title Z-A</button>
                {/*<select onChange={handleSort}>
                    <option value="releaseNew">Release newest first</option>
                    <option value="releaseOld">Release oldest first</option>
                    <option value="titleAsc">Title A-Z</option>
                    <option value="titleDesc">Title Z-A</option>
                </select>*/}
            </p>
        </div>
        <div>
            {searchResult.map(movie => <DisplayMovie key={movie.id} movie={movie}></DisplayMovie>)}
        </div>
      </div>
    )
}

export default SearchPage

function compareRelease(a, b) {
    if (Date.parse(a.releasedate) < Date.parse(b.releasedate)) {
      return -1
    } else if (Date.parse(a.releasedate) > Date.parse(b.releasedate)) {
      return 1
    }
    return 0;
  }

const DisplayMovie = ({movie}) => {

    var imageSource = `https://image.tmdb.org/t/p/original${movie.posterpath}`
    if(movie.posterpath === null){
        imageSource = image
    }
    return(
        <div class="movie-slot">
        <div  class='movie-pic'>
            <Link to={`/movie/${movie.movieid}`}>
                <img src={imageSource} />
            </Link>
        </div>
        <div class="movie-info">
            <Link to={`/movie/${movie.movieid}`}>{movie.title}</Link>
        </div>
        </div>
    )
}