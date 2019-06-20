export const getCode = url =>
  url.substring(url.indexOf("code=") + 5, url.length);

export const delay = ms => new Promise(res => setTimeout(res, ms));
