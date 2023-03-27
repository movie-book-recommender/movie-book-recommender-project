import { Link } from "react-router-dom";
import { Dropdown, Header, Image } from "semantic-ui-react";
import { useEffect, useState } from "react";
import axios from "axios";
import image from "./NoImage.jpg";

const DisplayMovie = ({ movie }) => {
  var imageSource = `https://image.tmdb.org/t/p/original${movie.posterpath}`;
  if (movie.posterpath === null) imageSource = image;
  return (
    <Dropdown.Item
      key={movie.id}
      content={
        <Header
          image={
            <Image
              src={imageSource}
              href={<Link to={`/movie/${movie.movieid}`}></Link>}
              size="massive"
              verticalAlign="middle"
            />
          }
          content={<Link to={`/movie/${movie.movieid}`}>{movie.title}</Link>}
          value={movie.id}
          subheader={movie.releasedate.split(" ")[3]}
        />
      }
    ></Dropdown.Item>
  );
};
const DisplayBook = ({ book }) => {
  var imageSource = book.img;
  if (book.img === null) imageSource = image;
  return (
    <Dropdown.Item
      key={book.item_id}
      content={
        <Header
          size="medium"
          image={
            <Image
              src={imageSource}
              href={<Link to={`/book/${book.item_id}`}></Link>}
              size="massive"
              verticalAlign="middle"
            />
          }
          value={book.item_id}
          content={<Link to={`/book/${book.item_id}`}>{book.title}</Link>}
          subheader={book.year}
        />
      }
    ></Dropdown.Item>
  );
};
const Search = ({ page }) => {
  const [item, setItem] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions([]);
    if (item.length > 0) {
      axios
        .get(`http://128.214.253.51:3000/dbsearch${page}byname?input=${item}`)
        .then((response) => {
          setOptions(response.data);
        });
    } else {
      setOptions([]);
    }
  }, [item]);

  useEffect(() => {
    setOptions([]);
  }, [page]);

  return (
    <Dropdown
      fluid
      closeOnChange
      placeholder={`Search for ${page}`}
      icon="search"
      labeled
      search
      onSearchChange={({ target }) => setItem(target.value)}
      className="SearchDropdown"
      noResultsMessage={null}
    >
      <Dropdown.Menu>
        {options.map((option) =>
          page === "movies" ? (
            <DisplayMovie movie={option} />
          ) : (
            <DisplayBook book={option} />
          )
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Search;
