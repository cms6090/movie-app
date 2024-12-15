import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Query = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const movies = useSelector((state) => state.movie.list); 

  const removeSpaces = (str) => str.replace(/\s+/g, "").toLowerCase();

  const filteredMovies = movies.filter(
    (movie) =>
      removeSpaces(movie.title).includes(removeSpaces(searchQuery)) ||
      removeSpaces(movie.en_title || "").includes(removeSpaces(searchQuery))
  );

  return (
    <div style={{ margin: "0 20%" }}>
      <h3>검색 결과 : "{searchQuery}"</h3>
      <div className="movies-card-container">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} style={{ marginBottom: "1em" }}>
              <NavLink
                to={`/movies/detail/${movie.id}`}
                className="movies-movie-card-wrap"
              >
                <div>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movies-movie-card-image"
                  />
                </div>
                <div className="movies-movie-info">
                  <div className="movies-movie-card-title">{movie.title}</div>
                </div>
              </NavLink>
              <div className="movies-movie-card-release">
                개봉일: {movie.releaseDate}
              </div>
              <div className="movies-movie-card-buttons">
                <NavLink
                  to={`/ticket/${movie.id}`}
                  className="movies-ticket-button"
                >
                  예매하기
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>검색 결과가 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default Query;
