import { configureStore } from "@reduxjs/toolkit";
import theaterReducer from "./theaterSlice";
import movieReducer from "./movieSlice";

const store = configureStore({
  reducer: {
    theater: theaterReducer,
    movie: movieReducer,
  },
});

export default store;