
export function addListener(event, callback, element = window) {
  if (window.addEventListener) {
    element.addEventListener(event, callback, false);
  } else if (window.attachEvent) {
    element.attachEvent(`on${event}`, callback)
  }
}

export function removeListener(event, callback) {
  if (window.removeEventListener) {
    element.removeEventListener(event, callback)
  } else if (window.detachEvent) {
    element.detachEvent(`on${event}`, callback)
  }
}

export default {
  addListener,
  removeListener
}