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

const NotFound = () => {
  return (
    <div style={{ margin: "2em 20%", textAlign: "center", color: "red" }}>
      <h1>404 Error</h1>
      <h3>존재하지 않는 페이지입니다</h3>
    </div>
  );
};

function App() {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState(null);

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

    return () => unsubscribe();
  }, []);

  if (!init) {
    return <div>Loading...</div>;
  }

  const PrivateRoute = ({ children }) => {
    if (!user) {
      alert("로그인이 필요합니다.");
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
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/detail/:id" element={<Detail />} />
              <Route path="/query" element={<Query />} />
              <Route path="/ticket" element={<Ticket />}>
                <Route path=":id" element={<Ticket />} />
              </Route>
              <Route
                path="/seats"
                element={
                  <PrivateRoute>
                    <Seats />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/mypage"
                element={
                  <PrivateRoute>
                    <MyPage />
                  </PrivateRoute>
                }
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
