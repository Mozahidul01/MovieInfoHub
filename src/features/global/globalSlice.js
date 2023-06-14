import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: {},
  sortBy: "popularity.desc",
  filterGenres: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGenres: (state, action) => {
      state.genres = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    setFilter: (state, action) => {
      state.filterGenres = action.payload;
    },
  },
});
export default globalSlice.reducer;

export const { setGenres, setSortBy, setFilter } = globalSlice.actions;
