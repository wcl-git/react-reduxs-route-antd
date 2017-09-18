
function setCookie (key, value) {
  let d = new Date();
  d.setTime(d.getTime()+(1*24*60*60*1000));
  let expires = "expires="+d.toGMTString();
  let newField = `${key}=${escape(value)};expires=${expires};path=/`;
  document.cookie = newField;
}

function getCookie (key) {
  let cookie = document.cookie;
  let items = cookie.split(';');
  let result;
  for (let i = 0, len = items.length; i < len; i++) {
    let tmp = items[i].split('=');
    if (tmp[0] === key || tmp[0] === ' ' + key) {
      result = tmp[1]
      break
    }
  }
  return result;
}

export default {
  getCookie,
  setCookie
}