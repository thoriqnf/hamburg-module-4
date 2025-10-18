export const setCookie = (
  name: string,
  value: string,
  minutes: number = 30,
) => {
  const expires = new Date();
  // 60 adalah detik, 1000 adalah milidetik
  expires.setTime(expires.getTime() + minutes * 60 * 1000);
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
};

export const getCookie = (name: string): string | null => {
  console.log("getCookie", document.cookie);
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1] || null
  );
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 2026 00:00:00 UTC`;
};

// seharusnya isAuthenticated bukan cmn ngecheck aja apakah accesstoken dan refreshToken itu ada
// kenapa? bisa ada user yang inject cookie dengan value yang salah
// seharusnya setelah dapet cookies dilakukan decode, lalu hasilnya di check
// cek apakah sudah expire belum
// const checkCookie = (cookie: string | null): boolean => {
//   if (!cookie) return false;
//   const decoded = decodeURIComponent(cookie);
//   const [value, expires] = decoded.split("|");
//   const now = new Date().getTime();
//   const exp = new Date(expires).getTime();
//   return now < exp;
// };

export const isAuthenticated = (): boolean => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return !!(accessToken && refreshToken);
};

export const logout = (router?: any) => {
  removeCookie("accessToken");
  removeCookie("refreshToken");
  removeCookie("auth-token");
  removeCookie("username");
  removeCookie("user-data");

  if (router && router.push) {
    router.push("/login");
  } else {
    window.location.href = "/login";
  }
};
