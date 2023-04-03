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
            <Grid.Row>
              <Grid.Column>
                <Segment
                  icon="heart"
                  content={
                    <Link to={`/${page}/wishlist`} data-link="Ratings">
                      WishList
                    </Link>
                  }
                />
              </Grid.Column>
              <Grid.Column as="a">
                <Header
                  icon="star outline"
                  content={
                    <Link to={`/${page}/ratings`} data-link="Ratings">
                      Ratings
                    </Link>
                  }
                />
              </Grid.Column>
              <Grid.Column as="a">
                <Icon name="search" />
                <Link to={`/${page}/search`} data-link="Search">
                  Search
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Sidebar>
        <Sidebar.Pusher dimmed={visible}>
          <Grid>
            <Grid.Row verticalAlign="middle" stretched>
              <Grid.Column width={3} textAlign="center">
                <Button circular compact basic animated="fade">
                  <Button.Content visible>
                    <Image
                      src={favicon}
                      size="tiny"
                      href={<Link to={`/`}></Link>}
                    />
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
