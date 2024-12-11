import { useLocation } from "react-router-dom";
import "./Seats.css";
import { useState } from "react";

const Seats = () => {
  const location = useLocation();
  const { theater, movie, date, time } = location.state || {};

  const [peopleNum, setpeopleNum] = useState(0);
  const maxPeople = 8;
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleNumClick = (count) => {
    if (count <= maxPeople) {
      setpeopleNum(count);
      setSelectedSeats([]);
    }
  };

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < peopleNum) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      alert(`최대 ${peopleNum}개 좌석만 선택 가능합니다.`);
    }
  };

  return (
    <div style={{ margin: "2em 20%" }}>
      <div className="section-title" style={{ textAlign: "center" }}>
        인원/좌석 선택
      </div>
      <div className="seat-container">
        <div className="seat-sections">
          <div style={{ fontSize: "0.8em", color: "red" }}>
            * 최대 {maxPeople}명 선택 가능
          </div>
          <div style={{ marginBottom: "1em" }}>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <button
                  key={`general-${i}`}
                  onClick={() => handleNumClick(i)}
                  className="seat-button"
                  style={{
                    backgroundColor:
                      i === peopleNum ? "rgba(0, 0, 0, 0.75)" : "#fff",
                    color: i === peopleNum ? "#fff" : "#000",
                  }}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="seat-sections seat-movie-info">
          <div>영화관: {theater}</div>
          <div style={{ textAlign: "right" }}>영화: {movie}</div>
          <div>날짜: {date}</div>
          <div style={{ textAlign: "right" }}>시간: {time}</div>
        </div>
      </div>
      <div className="seat-sections">
        <div>
          <div className="seat-grid">
            {rows.map((row) => (
              <div key={row} className="seat-row">
                {cols.map((col, index) => {
                  const seat = `${row}${col}`;
                  const isSelected = selectedSeats.includes(seat);

                  const isLeftSpace = index === 3;
                  const isRightSpace = index === 12;

                  return (
                    <div
                      key={seat}
                      style={{
                        marginRight: isLeftSpace ? "50px" : "5px",
                        marginLeft: isRightSpace ? "50px" : "0",
                      }}
                    >
                      <button
                        onClick={() => handleSeatClick(seat)}
                        className="seat-button"
                        style={{
                          width: "45px",
                          height: "45px",
                          backgroundColor: isSelected
                            ? "rgba(0, 0, 0, 0.75)"
                            : "#fff",
                          color: isSelected ? "#fff" : "#000",
                          cursor:
                            selectedSeats.length < peopleNum || isSelected
                              ? "pointer"
                              : "not-allowed",
                        }}
                      >
                        {seat}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "2em" }}>
        <button
          onClick={() =>
            alert(
              `선택된 인원: ${peopleNum}명\n선택된 좌석: ${selectedSeats.join(
                ", "
              )}\n선택된 영화관 : ${theater}\n선택된 영화 : ${movie}\n선택된 날짜 : ${date}\n선택된 시간 : ${time}`
            )
          }
          disabled={selectedSeats.length !== peopleNum || peopleNum === 0}
          style={{
            padding: "10px 20px",
            backgroundColor:
              selectedSeats.length === peopleNum && peopleNum !== 0
                ? "#4CAF50"
                : "#ccc",
            color:
              selectedSeats.length === peopleNum && peopleNum !== 0
                ? "white"
                : "#777",
            border: "none",
            borderRadius: "5px",
            cursor:
              selectedSeats.length === peopleNum && peopleNum !== 0
                ? "pointer"
                : "not-allowed",
          }}
        >
          선택 완료
        </button>
      </div>
    </div>
  );
};

export default Seats;
