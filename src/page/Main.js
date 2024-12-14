import "./Main.css";
import MovieCard from "../components/MovieCard";
import MainVideo from "../components/MainVideo";
import Theater from "../components/Theater";

const Main = () => {
  return (
    <div>
      <MainVideo />
      <div className="contents">
        <MovieCard />
        <Theater />
      </div>
    </div>
  );
};

export default Main;
