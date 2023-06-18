import Cookie from 'js-cookie';

export const setCookie = (key: string, value: any) => {
  return Cookie.set(key, value);
}

export const getCookie = (key: string) => {
  return Cookie.get(key);
}