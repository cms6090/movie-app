import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper 기본 CSS 가져오기
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";
import arrowLeft from "../assets/img/Arrowleft.svg";
import arrowRight from "../assets/img/Arrowright.svg";

const MovieCard = () => {
  const movies = [
    {
      id: "1",
      title: "모아나2",
      en_title: "MOANA2",
      releaseDate: "2024-01-01",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88381/88381_320.jpg",
    },
    {
      id: "2",
      title: "소방관",
      en_title: "FIREFIGHTERS",
      releaseDate: "2024-02-15",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88992/88992_320.jpg",
    },
    {
      id: "3",
      title: "1승",
      releaseDate: "2024-03-10",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000089/89075/89075_320.jpg",
    },
    {
      id: "4",
      title: "위키드",
      en_title: "Wicked",
      releaseDate: "2024-04-15",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88076/88076_320.jpg",
    },
    {
      id: "5",
      title: "플레이브 팬 콘서트",
      releaseDate: "2024-01-01",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000089/89287/89287_320.jpg",
    },
    {
      id: "6",
      title: "히든 페이스",
      en_title: "HIDDEN FACE",
      releaseDate: "2024-02-15",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88920/88920_320.jpg",
    },
    {
      id: "7",
      title: "더 크로우",
      en_title: "The Crow",
      releaseDate: "2024-03-10",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000089/89310/89310_320.jpg",
    },
    {
      id: "8",
      title: "원정빌라",
      releaseDate: "2024-04-15",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000089/89097/89097_320.jpg",
    },
    {
      id: "9",
      title: "엔시티 드림 미스터리 랩: 드림 이스케이프 인 시네마",
      en_title: "NCT DREAM Mystery Lab: DREAM( )SCAPE in Cinemas",
      releaseDate: "2024-04-15",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000089/89295/89295_320.jpg",
    },
    {
      id: "10",
      title: "인터스텔라",
      en_title: "Interstellar",
      releaseDate: "2024-04-15",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000077/77372/77372_320.jpg",
    },
  ];

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
                    src={movie.image}
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
