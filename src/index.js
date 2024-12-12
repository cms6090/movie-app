import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { setTheaterList } from "./redux/theaterSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseinit";

const fetchInitialData = async () => {
  try {
    // Firestore에서 데이터 가져오기
    const querySnapshot = await getDocs(collection(db, "theater"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Redux에 저장
    store.dispatch(setTheaterList(data));
  } catch (error) {
    console.error("Error fetching initial data: ", error);
  }
};

// 데이터 로드 후 앱 렌더링
fetchInitialData().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
});
