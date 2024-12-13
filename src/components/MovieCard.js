import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";
import arrowLeft from "../assets/img/Arrowleft.svg";
import arrowRight from "../assets/img/Arrowright.svg";
import { useSelector } from "react-redux";

const MovieCard = () => {
  const movies = useSelector((state) => state.movie.list);
  const swiperRef = useRef(null);

  const handleSlideChange = (direction) => {
    if (swiperRef.current) {
      direction === -1
        ? swiperRef.current.slidePrev()
        : swiperRef.current.slideNext();
    }
  };

  return (
    <div>
      <h2>무비 차트</h2>
      <div className="movie-card-container">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={5}
          spaceBetween={20}
          slidesPerGroup={5}
          breakpoints={{
            400: { slidesPerView: 2 },
            600: { slidesPerView: 3 },
            800: { slidesPerView: 4 },
            1000: { slidesPerView: 4 },
            1200: { slidesPerView: 4 },
            1600: { slidesPerView: 5 },
            1920: { slidesPerView: 5 },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="movie-card-wrap">
                <div>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movie-image"
                  />
                </div>
                <div className="movie-info">
                  <div className="movie-title">{movie.title}</div>
                  <div className="movie-release-date">
                    개봉일: {movie.releaseDate}
                  </div>
                </div>
                <div className="movie-card-hover">
                  <Link
                    to={`/movies/detail/${movie.id}`}
                    className="movie-card-hover-button"
                    style={{ background: "white" }}
                  >
                    상세보기
                  </Link>
                  <Link
                    to={`/ticket/${movie.id}`}
                    className="movie-card-hover-button"
                    style={{
                      color: "white",
                      background: "#e63946",
                    }}
                  >
                    예매하기
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <img
          src={arrowLeft}
          alt="Previous"
          className="movie-prev-btn"
          onClick={() => handleSlideChange(-1)}
        />
        <img
          src={arrowRight}
          alt="Next"
          className="movie-next-btn"
          onClick={() => handleSlideChange(1)}
        />
      </div>
    </div>
  );
};

export default MovieCard;
