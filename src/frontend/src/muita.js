export const Ratings = () => (
  <div class="page-container">
    <h2>MyRatings</h2>
  </div>
)

export const Wishlist = () => (
  <div class="page-container">
    <h2>WishList</h2>
  </div>
)

export const Search = () => (
  <form action="/search" method="GET">
      <label for="search">Search movies </label>
      <input type="search" id ="search" name="query" placeholder="Search movies"/>
      <button type="submit" value="submit">Search</button>
  </form>
)

export const Movies = () => (
  <div class="movie-list">
      <div class="movie-pic">Movie pic</div>
      <div class="movie-pic">Movie pic</div>
      <div class="movie-pic">Movie pic</div>
      <div class="movie-pic">Movie pic</div>
      <div class="movie-pic">Movie pic</div>
  </div>
)

export const Movie = ({movieId}) => {

  return (
    <div>
      Movie
    </div>
  )
}