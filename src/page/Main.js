import "./Main.css";
import MovieCard from "../components/MovieCard";
import MainVideo from "../components/MainVideo";
import Special from "../components/Special";

const Main = () => {
  return (
    <div>
      <MainVideo />
      <div className="contents">
        <MovieCard />
        <Special />
      </div>
    </div>
  );
};

export default Main;
