

//Creates a new cookie with the movieid as the name of the cookie, 
//rating as the value of the cookie. Exdays is the amount of days until the cookie expires
function setCookie(borm, movieid, rating, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  var prevRatings = getStringOfRatings(borm)
  if(getCookie(borm, movieid) !== 0){
    var ratings = prevRatings.split('&')
    var changedRatings = ""
    for(var i = 0; i < ratings.length; i++){
      var pair = ratings[i].split(":")
      if(pair[0] === movieid){
        pair[1] = rating
      }
      if(pair[0] !== ''){
        if(pair[0] === movieid && pair[1] === 0){
        }else{
          changedRatings = changedRatings + "&" + pair[0] + ":" + pair[1]
        }
      }
    }
    document.cookie = borm + "Ratings=" + changedRatings + ";" + expires + ";path=/"
  }else{
  document.cookie = borm + "Ratings=" + prevRatings + "&" + movieid + ":" + rating + ";" + expires + ";path=/";
  }  
}

const removeAllRatings = (borm) =>{
  const d = new Date();
  d.setTime(d.getTime() + (5 * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = borm + "Ratings=" + ";" + expires + ";path=/";
}

const getStringOfRatings = (borm) =>{
  var cookies = document.cookie.split(';')
  if(cookies[0] === '' || cookies.length === 0){
    return ""
  }
  var cookie = ""
  if(cookies[0].substring(0, 9) === borm + "Ratings="){
    cookie = cookies[0].substring(9)
  }
  for(var i = 1; i < cookies.length; i++){
    cookies[i] = cookies[i].substring(1)
    if(cookies[i].substring(0, 9) === borm + "Ratings="){
      cookie = cookies[i].substring(9)
    }  
  }   
  return cookie
}


function addToWishlist(borm, id, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  var prevWishlist = getStringOfWishlist()
  var list = prevWishlist.split('&')
  for (var i = 0; i < list.length; i++) {
    if (list[i] === borm + id) {
      list.splice(i, 1)
      changedList = list.join('&')
      document.cookie = "Wishlist:" + changedList + ";" + expires + ";path=/"
      return
    }
  }
  var changedList = prevWishlist + borm + id + "&"
  document.cookie = "Wishlist:" + changedList + ";" + expires + ";path=/"

}

function onWishlist(borm, id) {
  var prevWishlist = getStringOfWishlist()
  var list = prevWishlist.split('&')
  var bormId = borm + id
  return list.includes(bormId)
}

const getStringOfWishlist = () =>{
  var cookies = document.cookie.split(';')
  if(cookies[0] === '' || cookies[0] === undefined){
    return ""
  }
  var cookie =""
  for(var i = 0; i < cookies.length; i++) {
    if(cookies[i].trim().substring(0, 9) === "Wishlist:"){   
      console.log(cookies[i])   
      cookie = cookies[i].trim().substring(9)
    }
  }
  return cookie
}
//Searches saved cookies for a cookie with the name movieid
//Returns rating associated with that cookie or 0 if no cookie is found
function getCookie(borm, id) {
  var prevRatings = getStringOfRatings(borm)
  let pairs = prevRatings.split('&');
  for(let i = 1; i < pairs.length; i++) {
    let pair = pairs[i].split(':');
    if(pair[0].substring(0, 1) === ' '){
      pair[0] = pair[0].substring(1)
    }
    if(pair[0] === id){
      return pair[1];
    }
  }
  return 0;
}

//Returns a list of pairs. A pair has a cookies name/movieid in pair[0]
//and value/rating in pair[1]
function getCookies(borm){
  var prevRatings = getStringOfRatings(borm)
  var pairs = prevRatings.split("&")
  var cookies = []
  for(var i=0; i<pairs.length; i++){
    var pair = pairs[i].split(":")
    cookies[i] = pair;
  }
  cookies.shift()
  return cookies;
}

  export { setCookie, getCookie, getCookies, addToWishlist, getStringOfWishlist, onWishlist, removeAllRatings };
