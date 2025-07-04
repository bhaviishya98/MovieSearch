import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWatchlist, saveWatchlist } from "@/lib/firebaseWatchlist";

const initialState = {
  watchlist: [],
  loading: false,
  error: null,
};

export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async (userId) => {
    return await getWatchlist(userId);
  }
);

export const addToWatchlist = createAsyncThunk(
  "watchlist/addToWatchlist",
  async ({ userId, movie }, { getState }) => {
    const currentList = getState().watchlist.watchlist;
    const updatedList = [...currentList, movie];
    await saveWatchlist(userId, updatedList);
    return movie;
  }
);

export const removeFromWatchlist = createAsyncThunk(
  "watchlist/removeFromWatchlist",
  async ({ userId, movieId }, { getState }) => {
    const currentList = getState().watchlist.watchlist;
    const updatedList = currentList.filter((m) => m.id !== movieId);
    await saveWatchlist(userId, updatedList);
    return movieId;
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    clearWatchlist: (state) => {
      state.watchlist = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.watchlist.push(action.payload);
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.watchlist = state.watchlist.filter(
          (m) => m.id !== action.payload
        );
      });
  },
});

export const { clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
