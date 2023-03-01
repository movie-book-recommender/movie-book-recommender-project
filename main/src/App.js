import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"

import "./css/App.css";
import "react-multi-carousel/lib/styles.css";

import { Movie } from "./components/Movie";
import { Book } from "./components/Book";
import { Ratings } from "./pages/Ratings";
import { Wishlist } from "./pages/WishList";
import SearchPage from "./pages/SearchPage";
import MainPage from "./pages/MainPage";
import Navibar from "./Navibar";
import axios from 'axios'

const App = () => {
  const [page, setPage] = useState("movies");

  axios.interceptors.response.use(
    response =>{
      return response
    }, 
    error => {
      console.log('error: ' + error)
      if(error.response.status === 404){
        navigate("/")
      }
    }
  )
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`${page}`);
  }, [page]);

  const handleChange = () => {
    if (page === "movies") setPage("books");
    else setPage("movies");
  };

  return (
    <>
      <Helmet>
        <title>Movie-Book Recommender</title>
        <meta name="description" content="Get movie and book recommendations based on your ratings!" />
      </Helmet>
      <div className="page">
        <Navibar page={page} handleChange={handleChange}/>
        <Routes>
          <Route
            path="/:page"
            element={<MainPage page={page}  />}
          />
          <Route path="/:page/ratings" element={<Ratings page={page} />} />
          <Route path="/:page/wishlist" element={<Wishlist page={page} />} />
          <Route path="/:page/search" element={<SearchPage page={page} />} />
          <Route path="/movie/:id" element={<Movie page={page}/>} />
          <Route path="/book/:id" element={<Book page={page}/>} />
          <Route path="/" element={<MainPage page={page} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
