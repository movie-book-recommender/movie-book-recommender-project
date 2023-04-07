import { Link } from "react-router-dom";
import favicon from "./favicon.ico";
import Search from "./Search";
import React from "react";
import SidebarExampleDimmed from "./pages/sidebar";
// TODO: Update <Search> usage after its will be implemented
import {
  Menu,
  Dropdown,
  Grid,
  Header,
  Segment,
  Button,
  Image,
} from "semantic-ui-react";

const MenuExampleAttached = ({ page }) => (
  <div>
    <Menu attached="top">
      <Button
        circular
        compact
        basic
        content={
          <Image src={favicon} size="mini" href={<Link to={`/`}></Link>} />
        }
      />

      <Menu.Menu tiny size="" position="right" fluid>
        <Menu.Item>
          <Search page={page} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  </div>
);

const Navibar = () => {
  return (
<<<<<<< HEAD
    <>
      <SidebarExampleDimmed page={page} />
    </>
=======
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
>>>>>>> 4b31e714c95647ccbfb67731651aa5252936544d
  );
};

export default Navibar;
