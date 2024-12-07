import "./Movies.css";
import { Link, NavLink } from "react-router-dom";

const Movies = () => {
  const movies = [
    {
      id: "1",
      title: "모아나2",
      releaseDate: "2024-01-01",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88381/88381_320.jpg",
    },
    {
      id: "2",
      title: "소방관",
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
      releaseDate: "2024-02-15",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88920/88920_320.jpg",
    },
    {
      id: "7",
      title: "더 크로우",
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
      releaseDate: "2024-04-15",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000089/89295/89295_320.jpg",
    },
    {
      id: "10",
      title: "인터스텔라",
      releaseDate: "2024-04-15",
      image:
        "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000077/77372/77372_320.jpg",
    },
  ];

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
                  src={item.image}
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
