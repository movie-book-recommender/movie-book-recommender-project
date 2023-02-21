import axios from "axios";
import { useState, useEffect } from "react";

import "../css/App.css";
import "react-multi-carousel/lib/styles.css";

import Search from "../Search";
import Items from "../Carusel";

const MainPage = ({ page, handleChange }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let url = "http://128.214.253.51:3000/dbgettop10newestpublishedmovies";
    if (page === "books")
      url = "http://128.214.253.51:3000/dbgettop10newestbooks";
    axios.get(`${url}`).then((response) => {
      setItems(response.data);
    });
  }, [page]);

  return (
    <div className="page-container">
      <div className="switch-text">
        Your are currently on {page} page. <button onClick={handleChange}>Switch to {page === "books" ? "movies" : "books"}
        </button>
      </div>
      <h2>Top 10 newest {page}</h2>
      <Items items={items} page={page} />
      <Search page={page} />
    </div>
  );
};

export default MainPage;
