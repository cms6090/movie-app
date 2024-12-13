import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { setTheaterList } from "./redux/theaterSlice";
import { setMovieList } from "./redux/movieSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseinit";

let dataFetched = false; // 데이터가 이미 로드되었는지 확인하는 플래그

const fetchData = async () => {
  if (dataFetched) return; // 이미 데이터를 가져왔으면 실행하지 않음

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

    dataFetched = true; // 데이터 로드 상태 업데이트
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
