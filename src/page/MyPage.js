import React, { useState } from "react";
import Withdrawal from "../components/Withdrawal";
import ReservationDetails from "../components/ReservationDetails";
import "./MyPage.css";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("myDetails");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mypage-container">
      <h3>나의 내역</h3>

      <div className="tabs">
        <div
          onClick={() => handleTabClick("withdrawal")}
          className={`tab-button ${activeTab === "withdrawal" ? "active" : ""}`}
        >
          회원 탈퇴
        </div>
        <div
          onClick={() => handleTabClick("myDetails")}
          className={`tab-button ${activeTab === "myDetails" ? "active" : ""}`}
        >
          나의 내역
        </div>
      </div>

      <div>
        {activeTab === "withdrawal" ? <Withdrawal /> : <ReservationDetails />}
      </div>
    </div>
  );
};

export default MyPage;
