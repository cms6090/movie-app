import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebaseinit";
import { useSelector } from "react-redux";
import "./ReservationDetails.css";

const ReservationDetails = () => {
  const [reservations, setReservations] = useState([]); // 예약 내역 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState("");
  const movies = useSelector((state) => state.movie.list); // Redux에서 영화 정보 가져오기

  useEffect(() => {
    const fetchReservations = async () => {
      const auth = getAuth();
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
          return {
            id: doc.id,
            ...reservation,
            poster: movie?.poster || "", // 포스터 URL 추가
          };
        });

        // 상영시간 기준으로 정렬
        reservationsData.sort((a, b) => {
          const cleanDateA = a.date.replace(/\(.+\)/, "");
          const cleanDateB = b.date.replace(/\(.+\)/, "");

          const dateTimeA = `${cleanDateA}T${a.time}`;
          const dateTimeB = `${cleanDateB}T${b.time}`;

          return new Date(dateTimeA) - new Date(dateTimeB);
        });

        setReservations(reservationsData);
      } catch (err) {
        setError("예약 내역을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [movies]);

  const formatAmount = (amount) => {
    return amount.toLocaleString("ko-KR"); // 1,000 단위로 쉼표 추가
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const period = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환

    return `${year}-${month}-${day} ${period} ${formattedHours}:${minutes}:${seconds}`;
  };

  if (loading) {
    return <div>예약 내역을 불러오는 중...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (reservations.length === 0) {
    return (
      <div className="tab-content" style={{ color: "red" }}>
        예약 내역이 없습니다.
      </div>
    );
  }

  console.log(reservations);

  return (
    <div className="tab-content">
      {reservations.map((res) => (
        <div key={res.id} className="reserve-items">
          <div>
            <img
              src={res.poster}
              alt={res.movie}
              style={{ height: "14em", borderRadius: "10px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: "1.2em" }}>{res.movie}</div>
            <div className="reserve-item">
              <div className="reserve-item-item reserve-item-title">
                <div>상영관 </div>
                <div>상영일시</div>
                <div>관람인원</div>
                <div>좌석</div>
                <div>금액</div>
                <div>예약시간</div>
              </div>
              <div className="reserve-item-item reserve-item-txt">
                <div> {res.theater}</div>
                <div>
                  {res.date}
                  <span
                    style={{
                      marginLeft: "1em",
                      borderLeft: "2px solid rgba(0,0,0,0.3)",
                      paddingLeft: "1em",
                      color: "rgba(0,0,0,0.6)",
                    }}
                  >
                    {res.time}
                  </span>
                </div>
                <div>{res.peopleNum}</div>
                <div>{res.seats.join(", ")}</div>
                <div>{formatAmount(res.totalAmount)}원</div>
                <div>{formatTimestamp(res.timestamp)}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationDetails;
