import { createSlice } from "@reduxjs/toolkit";

const theaterSlice = createSlice({
  name: "theater",
  initialState: {
    list: [],
  },
  reducers: {
    setTheaterList(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setTheaterList } = theaterSlice.actions;
export default theaterSlice.reducer;
