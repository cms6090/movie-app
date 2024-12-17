import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseinit";
import { useSelector } from "react-redux";
import "./ReservationDetails.css";
import { getDoc } from "firebase/firestore";

const ReservationDetails = () => {
  const [pastReservations, setPastReservations] = useState([]); // 지난 예약 내역
  const [upcomingReservations, setUpcomingReservations] = useState([]); // 예약 예정 내역
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState("");
  const movies = useSelector((state) => state.movie.list); // Redux에서 영화 정보 가져오기

  useEffect(() => {
    const fetchReservations = async () => {
      const user = auth.currentUser;

      if (!user) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "reserve"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const reservationsData = querySnapshot.docs.map((doc) => {
          const reservation = doc.data();
          const movie = movies.find((m) => m.title === reservation.movie); // 영화 데이터 찾기
          console.log(reservation);
          return {
            id: doc.id,
            ...reservation,
            poster: movie?.poster || "", // 포스터 URL 추가
          };
        });

        // 현재 시간 기준으로 "지난 예약"과 "예약 예정" 분류
        const now = new Date(); // 현재 시간
        const past = [];
        const upcoming = [];

        reservationsData.forEach((reservation) => {
          const cleanDate = reservation.date.replace(/\(.+\)/, ""); // 요일 제거
          const reservationDateTime = new Date(
            `${cleanDate}T${reservation.time}`
          );

          if (reservationDateTime < now) {
            past.push(reservation);
          } else {
            upcoming.push(reservation);
          }
        });

        // 정렬: 상영 시간 기준 오름차순
        const sortReservations = (list) =>
          list.sort((a, b) => {
            const cleanDateA = a.date.replace(/\(.+\)/, "");
            const cleanDateB = b.date.replace(/\(.+\)/, "");
            const dateTimeA = new Date(`${cleanDateA}T${a.time}`);
            const dateTimeB = new Date(`${cleanDateB}T${b.time}`);
            return dateTimeA - dateTimeB;
          });

        setPastReservations(sortReservations(past));
        setUpcomingReservations(sortReservations(upcoming));
      } catch (err) {
        setError("예약 내역을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [movies]);

  const cancelReservation = async (reservation) => {
    try {
      const scheduleId = `${reservation.theater}_${reservation.movie}_${reservation.date}_${reservation.time}`;
      const scheduleRef = doc(db, "schedules", scheduleId);

      const scheduleSnap = await getDoc(scheduleRef);
      if (!scheduleSnap.exists()) {
        alert("상영 일정이 존재하지 않습니다.");
        return;
      }

      const scheduleData = scheduleSnap.data();

      const updatedSeats = { ...scheduleData.seats };

      reservation.seats.forEach((seat) => {
        if (updatedSeats[seat] === "reserved") {
          updatedSeats[seat] = "available";
        }
      });

      await updateDoc(scheduleRef, { seats: updatedSeats });

      const reservationRef = doc(db, "reserve", reservation.id);
      await deleteDoc(reservationRef);

      setUpcomingReservations((prev) =>
        prev.filter((res) => res.id !== reservation.id)
      );

      alert("예약이 성공적으로 취소되었습니다.");
    } catch (error) {
      console.error("예약 취소 중 오류 발생:", error);
      alert("예약 취소에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString("ko-KR");
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12;

    return `${year}-${month}-${day} ${period} ${formattedHours}:${minutes}`;
  };

  if (loading) {
    return <div>예약 내역을 불러오는 중...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div className="tab-content">
      <h2 style={{ marginTop: "0" }}>예약 내역</h2>
      {upcomingReservations.length > 0 ? (
        <div>
          <h3>현재 예약</h3>
          {upcomingReservations.map((res) => (
            <ReservationItem
              key={res.id}
              reservation={res}
              formatAmount={formatAmount}
              formatTimestamp={formatTimestamp}
              onCancel={cancelReservation}
            />
          ))}
        </div>
      ) : (
        <div style={{ color: "red" }}>현재 예약이 없습니다.</div>
      )}

      <h3>지난 예약</h3>
      {pastReservations.length > 0 ? (
        <div>
          {pastReservations.map((res) => (
            <ReservationItem
              key={res.id}
              reservation={res}
              formatAmount={formatAmount}
              formatTimestamp={formatTimestamp}
              onCancel={null}
            />
          ))}
        </div>
      ) : (
        <div style={{ color: "red" }}>지난 예약이 없습니다.</div>
      )}
    </div>
  );
};

const ReservationItem = ({
  reservation,
  formatAmount,
  formatTimestamp,
  onCancel,
}) => {
  const {
    poster,
    movie,
    theater,
    date,
    time,
    peopleNum,
    seats,
    totalAmount,
    timestamp,
  } = reservation;

  return (
    <div className="reserve-items">
      <div>
        <img
          src={poster}
          alt={movie}
          style={{ height: "14em", borderRadius: "10px" }}
        />
      </div>
      <div className="reserve-item-container">
        <div style={{ fontSize: "1.2em" }}>{movie}</div>
        <div className="reserve-item">
          <div className="reserve-item-item reserve-item-title">
            <div>상영관</div>
            <div>상영일시</div>
            <div>관람인원</div>
            <div>좌석</div>
            <div>금액</div>
            <div>예약시간</div>
          </div>
          <div className="reserve-item-item reserve-item-txt">
            <div>{theater}</div>
            <div>
              {date}
              <span
                style={{
                  marginLeft: "1em",
                  borderLeft: "2px solid rgba(0,0,0,0.3)",
                  paddingLeft: "1em",
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                {time}
              </span>
            </div>
            <div>{peopleNum}</div>
            <div>{seats.join(", ")}</div>
            <div>{formatAmount(totalAmount)}원</div>
            <div>{formatTimestamp(timestamp)}</div>
          </div>
        </div>
      </div>
      {onCancel && (
        <div className="cancel-container">
          <button
            onClick={() => onCancel(reservation)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#e63946",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            예약 취소
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationDetails;
