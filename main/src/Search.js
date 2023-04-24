import { useNavigate } from "react-router-dom";

import { Dropdown, Header, Image, Button } from "semantic-ui-react";
import { useEffect, useState } from "react";
import axios from "axios";
import image from "./assets/NoImage.jpg";

const DisplayMovie = ({ movie }) => {
  const navigate = useNavigate();

  var imageSource = `https://image.tmdb.org/t/p/original${movie.posterpath}`;
  if (movie.posterpath === null) imageSource = image;
  return (
    <Dropdown.Item
      value={movie.movieid}
      onClick={() => {
        navigate(`/movie/${movie.movieid}`);
      }}
      key={movie.movieid}
      content={
        <Header
          image={
            <Image src={imageSource} size="massive" verticalAlign="middle" />
          }
          content={movie.title}
          subheader={movie.releasedate && movie.releasedate.split(" ")[3]}
        />
      }
    ></Dropdown.Item>
  );
};
const DisplayBook = ({ book }) => {
  const navigate = useNavigate();

  var imageSource = book.img;
  if (book.img === null) imageSource = image;
  return (
    <Dropdown.Item
      key={book.item_id}
      value={book.item_id}
      onClick={() => {
        navigate(`/book/${book.item_id}`);
      }}
      content={
        <Header
          size="medium"
          image={
            <Image src={imageSource} size="massive" verticalAlign="middle" />
          }
          content={book.title}
          subheader={book.year}
        />
      }
    ></Dropdown.Item>
  );
};
const Search = () => {
  const [item, setItem] = useState("");
  const [placeholder, setPlaceHolder] = useState("Search ...");
  const [bookB, setBookB] = useState(false);
  const [movieB, setMovieB] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions([]);
    const category = movieB ? "movies" : "books";
    if (item.length > 0) {
      axios
        .get(
          `http://128.214.253.51:3000/dbsearch${category}byname?input=${item}`
        )
        .then((response) => {
          setOptions(response.data);
        });
    } else {
      setOptions([]);
    }
  }, [item]);

  useEffect(() => {
    setOptions([]);
  }, [bookB]);

  return (
    <div>
      <Dropdown
        onClose={() => setOptions([])}
        floating
        fluid
        search
        selection
        placeholder={`${placeholder}`}
        icon="search"
        onSearchChange={({ target }) => {
          setItem(target.value);
        }}
      >
        <Dropdown.Menu>
          <Dropdown.Header>
            <Button.Group fluid>
              <Button
                id={bookB ? "toggle" : null}
                toggle
                active={bookB}
                onClick={() => {
                  setBookB(true);
                  setMovieB(false);
                  setPlaceHolder("Search in books");
                }}
                content="Search in books"
              />

              <Button.Or />
              <Button
                id={movieB ? "toggle" : null}
                toggle
                active={movieB}
                onClick={() => {
                  setBookB(false);
                  setMovieB(true);
                  setPlaceHolder("Search in movies");
                }}
                content="Search in movies"
              />
            </Button.Group>
          </Dropdown.Header>
          {options.map((option) =>
            movieB ? (
              <DisplayMovie movie={option} />
            ) : (
              <DisplayBook book={option} />
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Search;
