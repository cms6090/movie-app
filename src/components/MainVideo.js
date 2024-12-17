import React, { useState, useRef, useEffect } from "react";
import "./MainVideo.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainVideo = () => {
  const movies = useSelector((state) => state.movie.list); // Redux에서 영화 데이터 가져오기
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setSelectedMovie(randomMovie);
    }
  }, [movies]);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  if (!selectedMovie) return null;

  return (
    <div
      style={{ display: "flex", justifyContent: "center", background: "black" }}
    >
      <div className="video-contents">
        <div className="video-wrap">
          <div className="video-overlay"></div>
          <div className="movie-video-container">
            <video ref={videoRef} autoPlay muted loop className="movie-video">
              <source src={selectedMovie.video} type="video/mp4" />
            </video>
          </div>
          <div className="movie-video-info-container">
            <h1 className="movie-video-title">{selectedMovie.title}</h1>
            <p
              className="movie-video-txt"
              dangerouslySetInnerHTML={{ __html: selectedMovie.info }}
            ></p>

            <div className="video-controller-container">
              <button
                className="detail"
                onClick={() => navigate(`/movies/detail/${selectedMovie.id}`)}
              >
                상세보기
              </button>
              <button className="playStop" onClick={togglePlay}>
                <span className="material-symbols-outlined">
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainVideo;
