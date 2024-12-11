import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Footer from "./components/Footer";
import Main from "./page/Main";
import Login from "./page/Login";
import Movies from "./page/Movies";
import Ticket from "./page/Ticket";
import Signup from "./page/Signup";
import Detail from "./page/Detail";
import Seats from "./page/Seats";
import Search from "./components/Search";
import Query from "./page/Query";
import MyPage from "./page/MyPage";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebaseinit";

function App() {
  const [init, setInit] = useState(false); // 초기화 상태 관리
  const [user, setUser] = useState(null); // 로그인 상태 관리

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("로그인 상태");
        setUser(currentUser);
      } else {
        console.log("로그아웃 상태");
        setUser(null);
      }
      setInit(true);
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, []);

  if (!init) {
    return <div>Loading...</div>; // 초기화 중 로딩 표시
  }

  // 보호된 경로 컴포넌트
  const PrivateRoute = ({ children }) => {
    if (!user) {
      alert("로그인을 하여야 합니다.");
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="App">
      <div className="app-container">
        <Router>
          <div className="content">
            <Header />
            <Search />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/detail/:id" element={<Detail />} />
              <Route path="/ticket" element={<Ticket />}>
                <Route path=":id" element={<Ticket />} />
              </Route>
              <Route path="/query" element={<Query />} />
              {/* 보호된 경로 */}
              <Route
                path="/seats"
                element={
                  <PrivateRoute>
                    <Seats />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage"
                element={
                  <PrivateRoute>
                    <MyPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
