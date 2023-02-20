import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from "react";
import image from "../NoImage.jpg";
import { getCookies } from "../Cookies.js";
import { GetMovieByID } from "../components/Movie";
import { GetBookByID } from "../components/Book";

var cookies = getCookies();

const DisplayMovie = ({ id, rating }) => {
  const movie = GetMovieByID(id);
  var ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: rating,
    edit: false,
  };
  var imageSource = `https://image.tmdb.org/t/p/original${movie.posterpath}`;
  if (movie.posterpath === null) {
    imageSource = image;
  }
  return (
    <div>
      <Link to={`/movie/${movie.movieid}`}>
        <img src={imageSource} width={150} height={"auto"} alt="movie-poster" />
      </Link>
      <h3>{movie.title}</h3>
      <ReactStars {...ratingStars} />
    </div>
  );
};

const DisplayBook = ({ id, rating }) => {
  const book = GetBookByID(id);
  var ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: rating,
    edit: false,
  };
  var imageSource = book.img;
  if (book.img === null) {
    imageSource = image;
  }
  return (
    <div>
      <Link to={`/movie/${book.item_id}`}>
        <img src={imageSource} width={150} height={"auto"} alt="book-poster" />
      </Link>
      <h3>{book.title}</h3>
      <ReactStars {...ratingStars} />
    </div>
  );
};

const Ratings = ({ page }) => {
  const [filtered, setFiltered] = useState([]);
  console.log(cookies);
  useEffect(() => {
    const filter = cookies.filter((coockie) => coockie[0][0] === page[0]);
    setFiltered(filter);
  }, [page]);

  if (cookies.length === 0) {
    <h2>MyRatings</h2>;
    return <h3>You have not rated any movies yet!</h3>;
  }

  return (
    <div class="page-container">
      <h2>MyRatings</h2>
      <h3>
        You have rated {filtered.length} {page}.
      </h3>
      <div>
        {filtered.map((cookie) =>
          page === "movies" ? (
            <DisplayMovie id={cookie[0].slice(1)} rating={cookie[1]} />
          ) : (
            <DisplayBook id={cookie[0].slice(1)} rating={cookie[1]} />
          )
        )}
      </div>
    </div>
  );
};

export default Ratings;
