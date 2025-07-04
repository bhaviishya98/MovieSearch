import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/lib/features/userSlice";
import movieSlice from "@/lib/features/movieSlice";
import watchlistSlice from "@/lib/features/watchlistSlice";

const middleware = (getDefaultMiddleware) => {
  const defaultMiddlewares = getDefaultMiddleware({
    serializableCheck: false,
  });

  return [...defaultMiddlewares];
};

const store = configureStore({
  reducer: {
    user: userSlice,
    movies: movieSlice,
    watchlist: watchlistSlice,
  },
  middleware,
});

export default store;
