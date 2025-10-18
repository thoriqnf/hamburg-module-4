// Simple cookie helpers for authentication
// Perfect for beginners to understand browser storage

export const setCookie = (name: string, value: string, minutes: number = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (minutes * 60 * 1000));
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
};

export const getCookie = (name: string): string | null => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1] || null;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};

export const isAuthenticated = (): boolean => {
  const token = getCookie('auth-token');
  const username = getCookie('username');
  return !!(token && username);
};

export const logout = () => {
  removeCookie('auth-token');
  removeCookie('username');
  removeCookie('user-data');
  window.location.href = '/login';
};