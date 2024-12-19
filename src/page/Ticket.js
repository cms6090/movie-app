import { useParams, useNavigate } from "react-router-dom";
import "./Ticket.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseinit";
import CircularProgress from "@mui/material/CircularProgress";

const times = ["06:30", "09:00", "11:30", "14:00", "16:30", "19:00", "21:30"];

const getNextDays = (numDays) => {
  const days = [];
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();

  for (let i = 0; i < numDays; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekday = weekdays[date.getDay()];

    days.push({
      formattedDate: `${year}-${month}-${day}(${weekday})`,
      dateObj: date,
    });
  }

  return days;
};

const Ticket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dates, setDates] = useState(getNextDays(21));
  const [theater, setTheater] = useState("영화관");
  const [movie, setMovie] = useState("영화 선택");
  const [date, setDate] = useState(dates[0].formattedDate);
  const [timeSeats, setTimeSeats] = useState({});
  const [time, setTime] = useState("시간 선택");
  const [loading, setLoading] = useState(false);

  const theaters = useSelector((state) => state.theater.list);
  const movies = useSelector((state) => state.movie.list);

  const selectedTheater = theaters.find((t) => t.theater_title === theater);
  const price = selectedTheater ? selectedTheater.theater_price : 0;

  useEffect(() => {
    const selectedMovie = movies.find((movie) => movie.id === id);
    if (selectedMovie) {
      setMovie(selectedMovie.title);
    }
  }, [id, movies]);

  useEffect(() => {
    const fetchTimeSeats = async () => {
      if (theater !== "영화관" && movie !== "영화 선택" && date) {
        setLoading(true);
        const newTimeSeats = {};

        for (const time of times) {
          const scheduleId = `${theater}_${movie}_${date}_${time}`;
          const scheduleRef = doc(db, "schedules", scheduleId);

          try {
            const snapshot = await getDoc(scheduleRef);
            if (snapshot.exists()) {
              const seats = snapshot.data().seats || {};
              newTimeSeats[time] = Object.values(seats).filter(
                (status) => status === "available"
              ).length;
            } else {
              newTimeSeats[time] = 128;
            }
          } catch (error) {
            console.error(`Error fetching schedule for ${time}:`, error);
            newTimeSeats[time] = null;
          }
        }

        setTimeSeats(newTimeSeats);
        setLoading(false);
      }
    };

    fetchTimeSeats();
  }, [theater, movie, date]);

  const handleTheaterClick = (selectedTheater) => {
    setTheater(selectedTheater);
    setTimeSeats({});
  };

  const handleMovieClick = (selectedMovie) => {
    setMovie(selectedMovie);
    setTimeSeats({});
  };

  const handleDateClick = (formattedDate) => {
    setDate(formattedDate);
    setTime("시간 선택");
    setTimeSeats({});
  };

  const handleTimeClick = (selectedTime) => {
    setTime(selectedTime);
  };

  const handleResetClick = () => {
    setTheater("영화관");
    setMovie("영화 선택");
    setDate(dates[0].formattedDate);
    setTime("시간 선택");
  };

  const handleButtonClick = () => {
    if (!isButtonDisabled) {
      navigate("/seats", {
        state: {
          theater,
          price,
          movie,
          date,
          time,
        },
      });
    }
  };

  const isButtonDisabled =
    theater === "영화관" || movie === "영화 선택" || time === "시간 선택";

  const now = new Date();
  const filteredTimes =
    date === dates[0].formattedDate
      ? times.filter((time) => new Date(`${now.toDateString()} ${time}`) > now)
      : times;

  return (
    <div style={{ margin: "2em 20%" }}>
      <div className="ticket-navi">
        <button className="ticket-reset" onClick={handleResetClick}>
          <span className="material-symbols-outlined">refresh</span>다시하기
        </button>
      </div>
      <div className="ticket-container">
        <div className="theater-section">
          <h3 className="section-title">{theater}</h3>
          <ul className="theater-list">
            {theaters.map(({ id, theater_title }) => (
              <li
                key={id}
                className="li-list"
                onClick={() => handleTheaterClick(theater_title)}
                style={{
                  border: theater === theater_title ? "2px solid #000" : "none",
                }}
              >
                {theater_title}
                {theater === theater_title && (
                  <span style={{ color: "red", fontWeight: "bold" }}>✔</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="movie-section">
          <h3 className="section-title">{movie}</h3>
          <ul className="movie-list">
            {movies.map(({ id, title }) => (
              <li
                key={id}
                className="li-list"
                onClick={() => handleMovieClick(title)}
                style={{
                  border: movie === title ? "2px solid #000" : "none",
                }}
              >
                {title}
                {movie === title && (
                  <span style={{ color: "red", fontWeight: "bold" }}>✔</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="date-section">
          <h3 className="section-title">{date}</h3>
          <div className="date-selector">
            {dates.map((day, index) => (
              <div
                key={index}
                className="li-list"
                onClick={() => handleDateClick(day.formattedDate)}
                style={{
                  justifyContent: "space-around",
                  fontWeight: date === day.formattedDate ? "bold" : "normal",
                  color: date === day.formattedDate ? "#000" : "#aaa",
                  border:
                    date === day.formattedDate ? "2px solid #000" : "none",
                }}
              >
                <div>{day?.formattedDate?.split("(")[0].split("-")[2]}</div>
                <div>{day?.formattedDate?.split("(")[1]?.replace(")", "")}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="time-section">
          <h3 className="section-title">{time}</h3>
          <div className="time-selector">
            {theater !== "영화관" && movie !== "영화 선택" && date ? (
              loading ? (
                <div>
                  <CircularProgress style={{ marginTop: "225px" }} />
                </div>
              ) : (
                filteredTimes.map((timeitem) =>
                  timeSeats[timeitem] !== undefined ? (
                    <div
                      key={timeitem}
                      onClick={() => handleTimeClick(timeitem)}
                      className="li-list"
                      style={{
                        justifyContent: "space-around",
                        fontWeight: timeitem === time ? "bold" : "normal",
                        color: timeitem === time ? "#000" : "#aaa",
                        border: timeitem === time ? "2px solid #000" : "none",
                      }}
                    >
                      <div>{timeitem}</div>
                      <div
                        style={{
                          fontSize: "0.8em",
                          background: "rgba(0,0,0,0.1)",
                          borderRadius: "10px",
                          padding: "0.2em 0.5em",
                        }}
                      >
                        잔여석: {timeSeats[timeitem]}
                      </div>
                    </div>
                  ) : (
                    <div
                      key={timeitem}
                      className="li-list"
                      style={{
                        justifyContent: "space-around",
                        border: "1px solid #ccc",
                        color: "#aaa",
                      }}
                    >
                      <div></div>
                    </div>
                  )
                )
              )
            ) : null}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1em",
        }}
      >
        <button
          disabled={isButtonDisabled}
          onClick={handleButtonClick}
          style={{
            backgroundColor: isButtonDisabled ? "#ccc" : "#4CAF50",
            color: isButtonDisabled ? "#777" : "white",
            border: "none",
            borderRadius: "5px",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
          }}
        >
          <div style={{ padding: "1em", fontSize: "1.1em" }}>
            인원/좌석 선택
          </div>
        </button>
      </div>
    </div>
  );
};

export default Ticket;
