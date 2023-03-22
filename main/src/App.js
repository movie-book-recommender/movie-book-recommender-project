import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./css/App.css";
import "react-multi-carousel/lib/styles.css";

import { Movie } from "./components/Movie";
import { Book } from "./components/Book";
import { Ratings } from "./pages/Ratings";
import { Wishlist } from "./pages/WishList";
import SearchPage from "./pages/SearchPage";
import MainPage from "./pages/MainPage";
import Navibar from "./Navibar";
import axios from "axios";

const App = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("error: " + error);
      if (error.response.status === 404) {
        navigate("/");
      }
    }
  );
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Movie-Book Recommender</title>
        <meta
          name="description"
          content="Get movie and book recommendations based on your ratings!"
        />
      </Helmet>
      <div className="page">
        <Navibar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/book/:id" element={<Book />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
