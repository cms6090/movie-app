import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { setTheaterList } from "./redux/theaterSlice";
import { setMovieList } from "./redux/movieSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseinit";

const fetchData = async () => {
  try {
    // Firestore에서 특별관 데이터 가져오기
    const theaterSnapshot = await getDocs(collection(db, "theater"));
    const theaters = theaterSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    store.dispatch(setTheaterList(theaters));

    // Firestore에서 영화 데이터 가져오기
    const movieSnapshot = await getDocs(collection(db, "movies"));
    const movies = movieSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    store.dispatch(setMovieList(movies));

    console.log("Theaters:", theaters);
    console.log("Movies:", movies);
  } catch (error) {
    console.error("Error fetching initial data:", error);
  }
};

// 데이터 로드 후 앱 렌더링
fetchData().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
