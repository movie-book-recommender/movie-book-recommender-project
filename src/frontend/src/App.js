import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);
  return (
    <div> <h2>The current time is {currentTime}</h2> </div>
  )
}

const Ratings = () => (
  <div> <h2>MyRatings</h2> </div>
)

const Wishlist = () => (

  <div> <h2>WishList</h2> </div>
)


const App = () => {
  const [page, setPage] = useState('home')

 const  toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'ItemPage') {
      return <Home />
    } else if (page === 'Ratings') {
      return <Ratings />
    } else if (page === 'WishList') {
      return <Wishlist />
    }
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <a href="" onClick={toPage('ItemPage')} style={padding}>
          ItemPage
        </a>
        <a href="" onClick={toPage('Ratings')} style={padding}>
          Ratings
        </a>
        <a href="" onClick={toPage('WishList')} style={padding}>
          WishList
        </a>
      </div>

      {content()}
    </div>
  )
}

export default App;