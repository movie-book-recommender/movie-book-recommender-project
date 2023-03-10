import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from "react";

import image from "../NoImage.jpg";
import { getCookies, setCookie, removeAllRatings } from "../Cookies.js";
import { GetMovieByID } from "../components/Movie";
import { GetBookByID } from "../components/Book";


var cookiesB = getCookies("B");
var cookiesM = getCookies("M");
const updateCookies = () =>{
  cookiesB = getCookies("B")
  cookiesM = getCookies("M")
}

const removeRating = (borm, id) =>{
  setCookie(borm, id, 0, 5)
  updateCookies()
} 

const removeAll = (borm) => {
  removeAllRatings(borm)
  updateCookies()
}

const DisplayMovie = ({ id, rating }) => {
  const movie = GetMovieByID(id);
  var ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: rating,
    onChange: (newValue) => {
      setCookie("M", id, newValue, 5);
      updateCookies()
    }
  };
  var imageSource = `https://image.tmdb.org/t/p/original${movie.posterpath}`;
  if (movie.posterpath === null) {
    imageSource = image;
  }
  return (
    <div>
      <Link to={`/movie/${movie.movieid}`}>
        <img src={imageSource} width={150} height={"auto"} />
      </Link>
      <h3>{movie.title}</h3>
      <ReactStars {...ratingStars} />
      <Link onClick={() =>{removeRating("M", id)}}>
        <p>Remove rating</p>
      </Link>
    </div>
  );
};

const DisplayBook = ({ id, rating }) =>{
  const book = GetBookByID(id)
  var ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: parseInt(rating),
    onChange: (newValue) => {
      setCookie("B", id, newValue, 5);
      updateCookies()
    }  
  };
  var imageSource = book.img
  if(book.img === null){
    imageSource = image
  }
  return(
    <div>
      <Link to={`/book/${book.item_id}`}>
        <img src={imageSource} width={150} height={"auto"} />
      </Link>
      <h3>{book.title}</h3>
      <ReactStars {...ratingStars} />
      <Link onClick={() =>{removeRating("B", id)}}>
        <p>Remove rating</p>
      </Link>
    </div>
  )
}

const Ratings = ({ page }) => {
  if(page === "books"){
    if (cookiesB.length === 0) {
      <h2>MyRatings</h2>
      return <h3>You have not rated anything yet!</h3>;
    }
    return(
    <div class="page-container">
      <h2>My ratings</h2>
      <h3>You have rated {cookiesB.length} books.</h3>
      <Link onClick={() =>{removeAll("B")}}>
        <p>Remove all ratings</p>
      </Link>
      <div>
        {cookiesB.map((cookie) => (
          <DisplayBook id={cookie[0]} rating={cookie[1]}/>
        ))}
      </div>
    </div>
    );
  }else{
    if (cookiesM.length === 0) {
      <h2>MyRatings</h2>
      return <h3>You have not rated anything yet!</h3>;
    }
    return (
      <div class="page-container">
        <h2>MyRatings</h2>
        <h3>You have rated {cookiesM.length} movies.</h3>
        <Link onClick={() =>{removeAll("M")}}>
          <p>Remove all ratings</p>
        </Link>
        <div>
          {cookiesM.map((cookie) => (
            <DisplayMovie id={cookie[0]} rating={cookie[1]} key={cookie[0]}/>
          ))}
        </div>
      </div>
    );
  }
};

export { Ratings, updateCookies };
