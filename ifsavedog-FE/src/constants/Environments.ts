const config = {
  baseUrl: window._env_?.VITE_BASE_URL || import.meta.env.VITE_BASE_URL,
  axiosTimeout:
    window._env_?.VITE_AXIOS_TIMEOUT || import.meta.env.VITE_AXIOS_TIMEOUT,
  cookieNameForLandingPage:
    window._env_?.VITE_COOKIE_NAME_FOR_LANDING_PAGE ||
    import.meta.env.VITE_COOKIE_NAME_FOR_LANDING_PAGE,
  cookieMaxAge:
    window._env_?.VITE_COOKIE_MAX_AGE || import.meta.env.VITE_COOKIE_MAX_AGE,
};

export default config;
