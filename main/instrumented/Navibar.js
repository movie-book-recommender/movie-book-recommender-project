import { Link } from "react-router-dom";

const Navibar = ({ page, handleChange }) => {
  return (
    <>
    <div className="navbar">
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
    <div className="switch-text">
      Your are currently on {page} page. <button onClick={handleChange}>Switch to {page === "books" ? "movies" : "books"}
      </button>
    </div>
    </>
  );
};

export default Navibar;
