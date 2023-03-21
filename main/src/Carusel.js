import "./css/App.css";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import image from "./NoImage.jpg";

const DisplayMovie = ({ movie, recommendation }) => {
  var imageSource = `https://image.tmdb.org/t/p/original${movie.posterpath}`;
  if (movie.posterpath === null) {
    imageSource = image;
  }
  // Recommendation argument is used to detect if we are displaying recommendations or not.
  // Difference between recommended books and "normal" ones is the field in JSON "item_id" and "similar_item_id".
  if (recommendation === true) {
    return (
      <div className="movie-slot">
        <div className="movie-pic" key={movie.similar_item_id}>
          <Link to={`/movie/${movie.similar_item_id}`}>
            <img src={imageSource} alt="movie poster" />
          </Link>
        </div>
        <div className="movie-info">
          <Link to={`/movie/${movie.similar_item_id}`}>{movie.title}</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="movie-slot">
      <div className="movie-pic" key={movie.id}>
        <Link to={`/movie/${movie.movieid}`}>
          <img src={imageSource} alt="movie poster" />
        </Link>
      </div>
      <div className="movie-info">
        <Link to={`/movie/${movie.movieid}`}>{movie.title}</Link>
      </div>
    </div>
  );
};

const DisplayBook = ({ book, recommendation }) => {
  var imageSource = book.img;
  if (book.img === null) {
    imageSource = image;
  }
  // Recommendation argument is used to detect if we are displaying recommendations or not.
  // Difference between recommended books and "normal" ones is the field in JSON "item_id" and "similar_item_id".
  if (recommendation === true) {
    return (
      <div className="movie-slot">
        <div className="movie-pic" key={book.similar_item_id}>
          <Link to={`/book/${book.similar_item_id}`}>
            <img src={imageSource} alt="book poster" />
          </Link>
        </div>
        <div className="movie-info">
          <Link to={`/book/${book.similar_item_id}`}>{book.title}</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="movie-slot">
      <div className="movie-pic" key={book.item_id}>
        <Link to={`/book/${book.item_id}`}>
          <img src={imageSource} alt="book poster" />
        </Link>
      </div>
      <div className="movie-info">
        <Link to={`/book/${book.item_id}`}>{book.title}</Link>
      </div>
    </div>
  );
};

const Items = ({ items, page, recommendation }) => (
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
            min: 1024,
          },
          items: 6,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 3,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={4}
      swipeable
    >
      {page === "movies"
        ? items.map((item) => (
            <DisplayMovie movie={item} page={page} key={item.movieid} />
          ))
        : items.map((item) => (
            <DisplayBook book={item} page={page} key={item.item_id} recommendation={recommendation} />
          ))}
    </Carousel>
  </div>
);

export default Items;
