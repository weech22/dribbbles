export const getCode = url =>
  url.substring(url.indexOf("code=") + 5, url.length);
