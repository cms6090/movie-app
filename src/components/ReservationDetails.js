import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebaseinit";
import { useSelector } from "react-redux";

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

        setReservations(reservationsData);
      } catch (err) {
        setError("예약 내역을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [movies]);

  if (loading) {
    return <div>예약 내역을 불러오는 중...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (reservations.length === 0) {
    return <div>예약 내역이 없습니다.</div>;
  }

  return (
    <div className="tab-content">
      <table className="reservations-table">
        <thead>
          <tr>
            <th>포스터</th>
            <th>영화관</th>
            <th>영화</th>
            <th>날짜</th>
            <th>시간</th>
            <th>좌석</th>
            <th>총 금액</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>
                <img
                  src={res.poster}
                  alt={res.movie}
                  style={{ width: "60px", height: "90px" }}
                />
              </td>
              <td>{res.theater}</td>
              <td>{res.movie}</td>
              <td>{res.date}</td>
              <td>{res.time}</td>
              <td>{res.seats.join(", ")}</td>
              <td>{res.totalAmount}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationDetails;
