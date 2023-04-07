import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/App.css";
import favicon from "../favicon.ico";
import MainPage from "./MainPage";
import { Link } from "react-router-dom";
import Search from "../Search";
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Button,
  Content,
} from "semantic-ui-react";

const MenuBar = ({ page }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="menu">
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Segment}
          animation="overlay"
          direction="top"
          icon="labeled"
          inverted
          onHide={() => setVisible(false)}
          visible={visible}
          width="wide"
          className=""
        >
          <Grid textAlign="center">
            <Menu inverted icon="labeled">
              <Menu.Item
                onClick={() => {
                  setVisible(false);
                  navigate(`/${page}/wishlist`);
                }}
              >
                <Icon name="heart" />
                WishList
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setVisible(false);
                  navigate(`/${page}/ratings`);
                }}
              >
                <Icon name="star outline" />
                WishList
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setVisible(false);
                  navigate(`/${page}/search`);
                }}
              >
                <Icon name="search" />
                Search
              </Menu.Item>
            </Menu>
          </Grid>
        </Sidebar>
        <Sidebar.Pusher dimmed={visible}>
          <Grid>
            <Grid.Row verticalAlign="middle" stretched>
              <Grid.Column width={3} textAlign="center">
                <Button
                  circular
                  basic
                  animated="fade"
                  onClick={() => navigate("/")}
                >
                  <Button.Content visible>
                    <Image src={favicon} size="tiny" centered />
                  </Button.Content>
                  <Button.Content hidden>Main Page</Button.Content>
                </Button>
              </Grid.Column>

              <Grid.Column width={9}>
                <Search page={page} />
              </Grid.Column>
              <Grid.Column width={4} floated="right">
                <Button
                  onClick={() => setVisible(true)}
                  animated="fade"
                  circular
                  compact
                  basic
                  size="massive"
                  textAlign="center"
                >
                  <Button.Content visible>
                    <Icon name="sidebar" />
                  </Button.Content>
                  <Button.Content hidden>Menu</Button.Content>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <MainPage page={page} />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

export default MenuBar;
