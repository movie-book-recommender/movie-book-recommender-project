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

const Navibar = ({ page, handleChange }) => {
  return (
    <>
      <SidebarExampleDimmed page={page} />
    </>
  );
};

export default Navibar;
