import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { setTheaterList } from "./redux/theaterSlice";
import { setMovieList } from "./redux/movieSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseinit";

let dataFetched = false;

const fetchData = async () => {
  if (dataFetched) return;

  try {
    const theaterSnapshot = await getDocs(collection(db, "theater"));
    const theaters = theaterSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    store.dispatch(setTheaterList(theaters));

    const movieSnapshot = await getDocs(collection(db, "movies"));
    const movies = movieSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    store.dispatch(setMovieList(movies));

    dataFetched = true;
  } catch (error) {
    console.error("Error fetching initial data:", error);
  }
};

fetchData().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
