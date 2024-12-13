import "./Movies.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Movies = () => {
  const movies = useSelector((state) => state.movie.list);

  return (
    <div className="movies-container">
      <h2>무비 차트</h2>
      <div className="movies-card-container">
        {movies.map((item) => (
          <div className="movies-movie-card" key={item.id}>
            <NavLink
              to={`/movies/detail/${item.id}`}
              className="movies-movie-card-wrap"
            >
              <div>
                <img
                  src={item.poster} // Firestore 데이터에서 poster 사용
                  alt={item.title}
                  className="movies-movie-card-image"
                />
              </div>
              <div className="movies-movie-info">
                <div className="movies-movie-card-title">{item.title}</div>
              </div>
            </NavLink>
            <div className="movies-movie-card-release">
              개봉일: {item.releaseDate}
            </div>
            <div className="movies-movie-card-buttons">
              <NavLink
                to={`/ticket/${item.id}`}
                className="movies-ticket-button"
              >
                예매하기
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
