import { useLocation, useNavigate } from "react-router-dom";
import "./Seats.css";
import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseinit";

const Seats = () => {
  const location = useLocation();
  const { theater, price, movie, date, time } = location.state || {};
  const navigate = useNavigate();

  const [peopleNum, setPeopleNum] = useState(0);
  const maxPeople = 8;
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const [seatStatus, setSeatStatus] = useState({}); 
  const [selectedSeats, setSelectedSeats] = useState([]);

  const scheduleId = `${theater}_${movie}_${date}_${time}`; 
  const scheduleRef = doc(db, "schedules", scheduleId);

  const user = auth.currentUser; 
  const userId = user ? user.uid : null; 

  const formatAmount = (amount) => {
    return amount.toLocaleString("ko-KR");
  };

  useEffect(() => {
    const fetchSeatStatus = async () => {
      const snapshot = await getDoc(scheduleRef);

      if (snapshot.exists()) {
        setSeatStatus(snapshot.data().seats);
      } else {
        const initialSeats = {};
        rows.forEach((row) => {
          cols.forEach((col) => {
            const seat = `${row}${col}`;
            initialSeats[seat] = "available";
          });
        });

        await setDoc(scheduleRef, { seats: initialSeats });
        setSeatStatus(initialSeats);
      }
    };

    fetchSeatStatus();

    const unsubscribe = onSnapshot(scheduleRef, (snapshot) => {
      if (snapshot.exists()) {
        setSeatStatus(snapshot.data().seats);
      }
    });

    return () => unsubscribe(); 
  }, [scheduleRef, rows, cols]);

  const handleNumClick = (count) => {
    if (count <= maxPeople) {
      setPeopleNum(count);
      setSelectedSeats([]);
    }
  };

  const handleSeatClick = (seat) => {
    if (seatStatus[seat] === "reserved") {
      alert("이미 예약된 좌석입니다.");
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < peopleNum) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      alert(`최대 ${peopleNum}개 좌석만 선택 가능합니다.`);
    }
  };

  const handleConfirmSeats = async () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      navigate("/login"); 
      return;
    }

    const updatedSeats = { ...seatStatus };
    selectedSeats.forEach((seat) => {
      updatedSeats[seat] = "reserved";
    });

    try {
      await updateDoc(scheduleRef, { seats: updatedSeats });

      const totalAmount = price * peopleNum;
      const reservationData = {
        userId,
        theater,
        movie,
        date,
        time,
        seats: selectedSeats,
        totalAmount,
        peopleNum,
        timestamp: new Date().toISOString(),
      };

      await addDoc(collection(db, "reserve"), reservationData);

      alert(`좌석 예약 완료: ${selectedSeats.join(", ")}`);
      setSelectedSeats([]);
      navigate("/");
    } catch (error) {
      console.error("예약 중 오류 발생:", error);
      alert("예약에 실패했습니다. 다시 시도해주세요.");
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
          <div>영화: {movie}</div>
          <div>날짜: {date}</div>
          <div>시간: {time}</div>
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
                          backgroundColor:
                            seatStatus[seat] === "reserved"
                              ? "#ccc"
                              : isSelected
                              ? "rgba(0, 0, 0, 0.75)"
                              : "#fff",
                          color:
                            seatStatus[seat] === "reserved"
                              ? "#777"
                              : isSelected
                              ? "#fff"
                              : "#000",
                          cursor:
                            seatStatus[seat] === "reserved"
                              ? "not-allowed"
                              : "pointer",
                        }}
                        disabled={seatStatus[seat] === "reserved"}
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
      <div
        style={{
          textAlign: "center",
          marginTop: "2em",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          금액 : {formatAmount(price)}원 X {peopleNum} =
          <span
            style={{ color: "red", fontWeight: "bold", marginLeft: "0.2em" }}
          >
            {formatAmount(price * peopleNum)}원
          </span>
        </div>
        <button
          onClick={handleConfirmSeats}
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
          예약
        </button>
      </div>
    </div>
  );
};

export default Seats;
