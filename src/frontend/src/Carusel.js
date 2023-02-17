import "./css/App.css";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import image from "./NoImage.jpg";

const DisplayMovie = ({ movie }) => {
  var imageSource = `https://image.tmdb.org/t/p/original${movie.posterpath}`;
  if (movie.posterpath === null) {
    imageSource = image;
  }
  return (
    <div class="movie-slot">
      <div class="movie-pic" key={movie.id}>
        <Link to={`/movie/${movie.movieid}`}>
          <img src={imageSource} alt="movie poster" />
        </Link>
      </div>
      <div class="movie-info">
        <Link to={`/movie/${movie.movieid}`}>{movie.title}</Link>
      </div>
    </div>
  );
};

const DisplayBook = ({ book }) => {
  var imageSource = book.img;
  if (book.img === null) {
    imageSource = image;
  }
  return (
    <div class="movie-slot">
      <div class="movie-pic" key={book.item_id}>
        <Link to={`/book/${book.item_id}`}>
          <img src={imageSource} alt="book poster" />
        </Link>
      </div>
      <div class="movie-info">
        <Link to={`/book/${book.item_id}`}>{book.title}</Link>
      </div>
    </div>
  );
};

const Items = ({ items, page }) => (
  <div class="page-container">
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
        ? items.map((item) => <DisplayMovie movie={item} page={page} />)
        : items.map((item) => <DisplayBook book={item} page={page} />)}
    </Carousel>
  </div>
);

export default Items;
