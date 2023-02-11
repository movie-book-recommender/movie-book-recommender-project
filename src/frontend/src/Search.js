import axios from 'axios'
import { useState, useEffect} from 'react'
import './css/App.css'

import Items from './MovieCarusel'

const Search = () => {
    const [searchResult, setSearchResult] = useState()

    const [newSearch, setNewSearch] = useState()
    useEffect(() => { 
      console.log(newSearch)
      axios
      .get(`http://128.214.253.51:3000/dbsearchmoviesbyname?input=${newSearch}`)
      .then(response => {
        setSearchResult(response.data)
      })
  }, [newSearch]);


    return(
      <div>
        <form >
            <label for="search">Search movies </label>
            <input value={newSearch} onChange={({ target }) => setNewSearch(target.value)} placeholder="Search movies"/>
        </form>
        {newSearch && searchResult && <Items items={searchResult}/>  }

      </div>

    )
}

export default Search
