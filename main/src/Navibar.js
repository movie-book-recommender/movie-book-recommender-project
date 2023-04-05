import { Link } from "react-router-dom";

const Navibar = () => {
  return (
    <div className="navbar">
      <Link to={`/`} data-link="ItemLens">
        ItemLens
      </Link>
      <Link to={`/wishlist`} data-link="Wishlist">
        Wishlist
      </Link>
      <Link to={`/ratings`} data-link="Ratings">
        Ratings
      </Link>
      <Link to={`/search`} data-link="Search">
        Search
      </Link>
    </div>
  );
};

export default Navibar;
