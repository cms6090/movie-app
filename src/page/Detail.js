import { useParams } from "react-router-dom";
import "./Detail.css";
import YouTube from "react-youtube";

const movies = [
  {
    id: "1",
    title: "모아나2",
    en_title: "MOANA2",
    releaseDate: "2024-01-01",
    감독: "데이비드 데릭 주니어",
    배우: "아우이 크라발호 ,  드웨인 존슨",
    장르: "애니메이션",
    기본정보: "전체관람가, 100분, 미국, 캐나다",
    youtubekey: "zKIN_aZM1Qc",
    image:
      "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88381/88381_320.jpg",
  },
  {
    id: "2",
    title: "소방관",
    en_title: "FIREFIGHTERS",
    releaseDate: "2024-02-15",
    감독: "곽경택",
    배우: "주원 (문준원) ,  곽도원 ,  유재명 ,  이유영 ,  김민재 ,  오대환 ,  이준혁 ,  장영남",
    장르: "드라마",
    기본정보: "12세이상관람가, 106분, 한국",
    image:
      "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88992/88992_320.jpg",
  },
  {
    id: "3",
    title: "1승",
    en_title: "One Win",
    releaseDate: "2024-03-10",
    감독: "신연식",
    배우: "송강호 ,  박정민 ,  장윤주",
    장르: "드라마",
    기본정보: "12세이상관람가, 107분, 한국",
    image:
      "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000089/89075/89075_320.jpg",
  },
  {
    id: "4",
    title: "위키드",
    en_title: "Wicked",
    releaseDate: "2024-04-15",
    감독: "존 추",
    배우: "아리아나 그란데 ,  신시아 에리보 ,  조나단 베일리 ,  에단 슬레이터 ,  양자경 ,  제프 골드브럼",
    장르: "환타지, 뮤지컬",
    기본정보: "전체관람가, 160분, 미국",
    youtubekey: "eblQHvJTHcc",
    image:
      "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88076/88076_320.jpg",
  },
  {
    id: "5",
    title: "플레이브 팬 콘서트",
    releaseDate: "2024-01-01",
    기본정보: "전체관람가, 194분, 한국",
    image:
      "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000089/89287/89287_320.jpg",
  },
  {
    id: "6",
    title: "히든 페이스",
    en_title: "HIDDEN FACE",
    releaseDate: "2024-02-15",
    감독: "김대우",
    프로듀서: "박재현 ,  송지은 ,  박경서",
    배우: "송승헌 ,  조여정 ,  박지현 ,  박지영 ,  박성근",
    장르: "스릴러",
    기본정보: "청소년관람불가, 115분, 한국",
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
    en_title: "The Unrighteous",
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

const Detail = () => {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === id);

  return (
    <div className="detail-container">
      {movie ? (
        <>
          <div className="detail-header">
            <img
              src={movie.image}
              alt={movie.title}
              className="detail-poster"
            />
            <div className="detail-info">
              <div
                style={{
                  fontSize: "1.3em",
                  fontWeight: "600",
                }}
              >
                {movie.title}
              </div>
              {movie.en_title ? (
                <div style={{ marginBottom: "1em", fontSize:'0.8em', fontWeight:'500' }}>{movie.en_title}</div>
              ) : (
                <div style={{ marginBottom: "1em" }}></div>
              )}
              <hr />
              <div style={{ marginTop: "1em", lineHeight: "2em" }}>
                <div>감독: {movie.감독}</div>
                {movie.배우 && <div>배우: {movie.배우}</div>}
                {movie.프로듀서 && <div>프로듀서: {movie.프로듀서}</div>}
                <div>기본 정보: {movie.기본정보}</div>
                <div className="detail-release">
                  개봉일: {movie.releaseDate}
                </div>
                <div className="detail-description">장르: {movie.장르}</div>
              </div>
            </div>
          </div>
          <div className="detail-content">
            <p>{movie.title}의 주요 줄거리 내용을 여기에 추가하세요.</p>
          </div>
          <hr />
          <YouTube
            videoId={movie.youtubekey}
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
        </>
      ) : (
        <p>영화를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default Detail;
