import "./Main.css";
import MovieCard from "../components/MovieCard";
import MainVideo from "../components/MainVideo";

const Main = () => {
  return (
    <div>
      <MainVideo />
      <div className="contents">
        <MovieCard />
      </div>
    </div>
  );
};

export default Main;
