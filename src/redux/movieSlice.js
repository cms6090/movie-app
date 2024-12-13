import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    list: [],
  },
  reducers: {
    setMovieList(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setMovieList } = movieSlice.actions;
export default movieSlice.reducer;
