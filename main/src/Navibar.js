import { Link } from "react-router-dom";

const Navibar = ({ page }) => {
  return (
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
  );
};

export default Navibar;
