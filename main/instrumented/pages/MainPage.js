import axios from "axios";
import { useState, useEffect } from "react";

import "../css/App.css";
import "react-multi-carousel/lib/styles.css";

import Search from "../Search";
import Items from "../Carusel";

const GetBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://128.214.253.51:3000/dbgettop10newestbooks")
      .then((response) => {
        setBooks(response.data);
      });
  }, []);
  return books;
};

const GetMovies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://128.214.253.51:3000/dbgettop10newestpublishedmovies")
      .then((response) => {
        setMovies(response.data);
      });
  }, []);
  return movies;
};

const MainPage = ({ page }) => {
  const books = GetBooks();
  const movies = GetMovies();

  return (
    <div className="page-container">
      <h2>Top 10 newest {page}</h2>
      {page === "movies" ? (
        <Items items={movies} page={page} />
      ) : (
        <Items items={books} page={page} />
      )}
      <Search page={page} />
    </div>
  );
};

export default MainPage;
