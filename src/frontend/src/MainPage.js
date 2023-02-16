import { useState, useEffect } from "react";
import "./css/App.css";
import { Link } from "react-router-dom";

import axios from "axios";
import "react-multi-carousel/lib/styles.css";

import Search from "./Search";
import Items from "./Carusel";
import "./css/App.css";

import "react-multi-carousel/lib/styles.css";

const Menu = ({ page }) => {
  return (
    <div class="navbar">
      <Link to={`/${page}`} data-link="ItemLens">
        ItemLens
      </Link>
      <Link to={`/${page}/wishlist`} data-link="Wishlist">
        Wishlist
      </Link>
      <Link to={`/${page}/ratings`} data-link="Ratings">
        Ratings
      </Link>
      <Link to={`/${page}/search`} data-link="Search">
        Search
      </Link>
    </div>
  );
};

const MainPage = ({ page }) => {
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
    <div class="page-container">
      <Menu page={page} />
      <h2>Top 10 newest {page}</h2>
      <Items items={items} page={page} />
      <Search page={page} />
    </div>
  );
};

export default MainPage;
