import './css/App.css'
import {
 Link
} from "react-router-dom"


import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';


const Items = ({ items }) => (
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
            min: 1024
          },
          items: 6
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 3
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 1
        }
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
      {items.map(item =>
          <div class="movie-slot">
            <div  class='movie-pic' key={item.id} >
              <Link to={`/movie/${item.movieid}`}>
              <a href="/"></a><img src={"https://image.tmdb.org/t/p/original"+item.posterpath} img/>
              </Link>
            </div>
            <div class="movie-info">
              <Link to={`/movie/${item.movieid}`}>{item.title}</Link>
            </div>
          </div>)}
    </Carousel>
  </div>
)

export default Items