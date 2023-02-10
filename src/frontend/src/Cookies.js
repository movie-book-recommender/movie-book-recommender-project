

//Creates a new cookie with the movieid as the name of the cookie, 
//rating as the value of the cookie. Exdays is the amount of days until the cookie expires
function setCookie(movieid, rating, wishlist, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = "m" + movieid + "=" + rating + "=" + wishlist + ";" + expires + ";path=/";
  window.location.reload()
}

//Searchers saved cookies for a cookie with the name movieid
//Returns rating associated with that cookie or 0 if no cookie is found
function getCookie(movieid) {
  let pairs = document.cookie.split(';');
  for(let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    if(pair[0].substring(0, 1) === ' '){
      pair[0] = pair[0].substring(1)
    }
    if(pair[0].substring(1) === movieid){
      return pair[1];
    }
  }
  return 0;
}

//Returns boolean telling wether or not the given movie is on the users wishlist
function onWishlist(movieId) {
  let pairs = document.cookie.split(';');
  for(let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    if(pair[0].substring(0, 1) === ' '){
      pair[0] = pair[0].substring(1)
    }
    if(pair.length === 3){
      return pair[2] === "1";
    }
  }
  return false;
}

//Returns a list of movies that are on the users wishlist
var getWishlist = function(){
  var pairs = document.cookie.split(";")
  var cookies = []
  for(var i=0; i<pairs.length; i++){
    var trio = pairs[i].split("=")
    if (trio.length >= 3 && trio[2] === "1") {
      if(trio[0].substring(0, 1) === ' '){
        trio[0] = trio[0].substring(1)
      }
      trio[0] = trio[0].substring(1)
      cookies[i] = trio;
    }
  }
  return cookies;
}

//Returns a list of pairs. A pair has a cookies name/movieid in pair[0]
//and value/rating in pair[1]
//Returns only movieid and rating, excluding wishlist binary.
var getCookies = function(){
  var pairs = document.cookie.split(";")
  var cookies = []
  for(var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=")
    if(pair[0].substring(0, 1) === ' '){
      pair[0] = pair[0].substring(1)
    }
    pair[0] = pair[0].substring(1)
    cookies[0] = pair[0];
    cookies[1] = pair[1];
    
  }
  return cookies;
}

  export { setCookie, getCookie, getCookies, onWishlist, getWishlist };