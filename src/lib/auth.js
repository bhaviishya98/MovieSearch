export const AUTH_STORAGE_KEY = "movieapp_user";
export const WATCHLIST_STORAGE_KEY = "movieapp_watchlist";
export const RATINGS_STORAGE_KEY = "movieapp_ratings";

export const saveUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem(AUTH_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const removeUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(WATCHLIST_STORAGE_KEY);
    localStorage.removeItem(RATINGS_STORAGE_KEY);
  }
};

export const saveWatchlist = (watchlist) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
  }
};

export const getWatchlist = () => {
  if (typeof window !== "undefined") {
    const watchlistData = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    return watchlistData ? JSON.parse(watchlistData) : [];
  }
  return [];
};

export const saveRatings = (ratings) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
  }
};

export const getRatings = () => {
  if (typeof window !== "undefined") {
    const ratingsData = localStorage.getItem(RATINGS_STORAGE_KEY);
    return ratingsData ? JSON.parse(ratingsData) : {};
  }
  return {};
};
