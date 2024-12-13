import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Detail.css";
import YouTube from "react-youtube";
import { useEffect } from "react";

const Detail = () => {
  const { id } = useParams();
  // Redux에서 영화 데이터를 가져오기
  const movies = useSelector((state) => state.movie.list);
  const movie = movies.find((movie) => movie.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="detail-container">
      {movie ? (
        <>
          <div className="detail-header">
            <img
              src={movie.poster} // Firestore 데이터에서 poster 필드 사용
              alt={movie.title}
              className="detail-poster"
            />
            <div className="detail-info">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div
                    style={{
                      fontSize: "1.3em",
                      fontWeight: "600",
                    }}
                  >
                    {movie.title}
                  </div>
                  {movie.en_title ? (
                    <div
                      style={{
                        fontSize: "0.8em",
                        fontWeight: "500",
                      }}
                    >
                      {movie.en_title}
                    </div>
                  ) : (
                    <div style={{ marginBottom: "1em" }}></div>
                  )}
                </div>
                <Link
                  to={`/ticket/${movie.id}`}
                  className="movie-card-hover-button"
                  style={{
                    color: "white",
                    background: "#e63946",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  예매하기
                </Link>
              </div>
              <hr />
              <div style={{ marginTop: "1em", lineHeight: "2em" }}>
                {movie.director && <div>감독: {movie.director}</div>}
                {movie.actor && <div>배우: {movie.actor}</div>}
                {movie.producer && <div>프로듀서: {movie.producer}</div>}
                {movie.genre && <div>장르: {movie.genre}</div>}
                <div>기본 정보: {movie.basicInfo}</div>
                <div className="detail-release">
                  개봉일: {movie.releaseDate}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="detail-content">
            <div dangerouslySetInnerHTML={{ __html: movie.txt }}></div>
          </div>
          <hr />
          <div style={{ marginTop: "1em" }}>
            {movie.youtube && (
              <YouTube
                videoId={movie.youtube}
                opts={{
                  width: "100%",
                  height: "auto",
                  playerVars: {
                    autoplay: 0,
                    rel: 0,
                  },
                }}
                className="youtube-player"
              />
            )}
          </div>
        </>
      ) : (
        <p>영화를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default Detail;
