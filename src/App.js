import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Main from "./page/Main";
import Login from "./page/Login";
import Movies from "./page/Movies";
import Ticket from "./page/Ticket";
import Signup from "./page/Signup";
import Detail from "./page/Detail";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Router>
          <div className="content">
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/detail/:id" element={<Detail />} />
              <Route path="/ticket" element={<Ticket />}>
                <Route path=":id" element={<Ticket />} />
              </Route>
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
