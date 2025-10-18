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
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  return !!(accessToken && refreshToken);
};

export const logout = (router?: any) => {
  removeCookie('accessToken');
  removeCookie('refreshToken');
  removeCookie('auth-token');
  removeCookie('username');
  removeCookie('user-data');

  if (router && router.push) {
    router.push('/login');
  } else {
    window.location.href = '/login';
  }
};