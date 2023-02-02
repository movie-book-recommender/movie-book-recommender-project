

const setCookie = ({movieid, rating, exdays}) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = movieid + "=" + rating + ";" + expires + ";path=/";
}
  
const getCookie = ({movieid}) => {
    let name = movieid + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

const getCookies = () =>{
  var pairs = document.cookie.split(";")
  var cookies = []
  console.log('hei')
  for(var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=")
    cookies[i] = pair;
  }
    return cookies;
}

  export default { setCookie, getCookie, getCookies };