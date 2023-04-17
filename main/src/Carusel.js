import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";

import "react-multi-carousel/lib/styles.css";
import "./css/App.css";

import image from "./assets/NoImage.jpg";
import { Card, CardContent, CardMedia } from "@mui/material";
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

const DisplayMovie = ({ movie, recommendation, size }) => {
  // Recommendation argument is used to detect if we are displaying recommendations or not.
  // Difference between recommended books and "normal" ones is the field in JSON "item_id" and "similar_item_id".
  var imageSource = movie.posterpath
    ? `https://image.tmdb.org/t/p/original${movie.posterpath}`
    : image;
  let movieId = recommendation ? movie.similar_item_id : movie.movieid;

  return (
    <div className="movie-slot" key={movie.id}>
      <Card sx={{ maxWidth: 166 }}>
        <CardMedia class="movie-pic">
          <Link to={`/movie/${movieId}`}>
            <img class={size} src={imageSource} alt="movie poster" />
          </Link>
        </CardMedia>
        <CardContent class="movie-info">
          <LocalMoviesRoundedIcon />
          <Link to={`/movie/${movieId}`}>{movie.title}</Link>
        </CardContent>
      </Card>
    </div>
  );
};

const DisplayBook = ({ book, recommendation, size }) => {
  // Recommendation argument is used to detect if we are displaying recommendations or not.
  // Difference between recommended books and "normal" ones is the field in JSON "item_id" and "similar_item_id".
  var imageSource = book.img ? book.img : image;
  let bookId = recommendation ? book.similar_item_id : book.item_id;

  return (
    <div className="movie-slot" key={bookId}>
      <Card sx={{ maxWidth: 166 }}>
        <CardMedia class="movie-pic">
          <Link to={`/book/${bookId}`}>
            <img class={size} src={imageSource} alt="book cover" />
          </Link>
        </CardMedia>
        <CardContent class="movie-info">
          <MenuBookRoundedIcon />
          <Link to={`/book/${bookId}`}>{book.title}</Link>
        </CardContent>
      </Card>
    </div>
  );
};

const Items = ({ items, page, size, recommendation = false }) => (
  // Argument "recommendation" is not always necessary, only when displaying recommendations.
  <div className="page-container">
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={true}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1280,
          },
          items: 6,
          slidesToSlide: 6,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
        },
        small_desktop: {
          breakpoint: {
            max: 1280,
            min: 1024,
          },
          items: 5,
          slidesToSlide: 5,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 3,
          slidesToSlide: 3,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      swipeable
    >
      {page === "movies"
        ? items.map((item) => (
            <DisplayMovie
              key={item.movieid}
              movie={item}
              page={page}
              size={size}
              recommendation={recommendation}
            />
          ))
        : items.map((item) => (
            <DisplayBook
              key={item.item_id}
              book={item}
              page={page}
              size={size}
              recommendation={recommendation}
            />
          ))}
    </Carousel>
  </div>
);

export default Items;
