import React, { useState } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  signOut,
  reauthenticateWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "./MyPage.css";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("myDetails");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState("");
  const [isWithdrawn, setIsWithdrawn] = useState(false);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setEnteredPassword(e.target.value);
    setError("");
  };

  const handleWithdrawal = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("로그인된 사용자가 없습니다.");
      return;
    }

    // 유저의 Provider 확인
    const providerData = user.providerData[0];
    try {
      // Google 로그인 사용자라면 Google Provider로 재인증
      if (providerData && providerData.providerId === "google.com") {
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, provider);
      } else {
        // 이메일 로그인 사용자라면 비밀번호로 재인증
        if (!enteredPassword) {
          setError("비밀번호를 입력해주세요.");
          return;
        }
        const credential = EmailAuthProvider.credential(
          user.email,
          enteredPassword
        );
        await reauthenticateWithCredential(user, credential);
      }
      navigate("/");

      // 재인증 성공 후 사용자 삭제
      await deleteUser(user);
      setIsWithdrawn(true);
      alert("회원 탈퇴가 완료되었습니다.");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setError("비밀번호가 일치하지 않습니다.");
      } else if (err.code === "auth/network-request-failed") {
        setError("네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.");
      } else if (err.code === "auth/user-token-expired") {
        setError("회원 탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.");
      } else if (err.code === "auth/popup-closed-by-user") {
        setError("구글 재인증 창이 닫혔습니다. 다시 시도해주세요.");
      } else {
        setError("회원 탈퇴에 실패하였습니다. 다시 시도해주세요.");
      }
    }
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
        {activeTab === "withdrawal" && !isWithdrawn && (
          <div className="tab-content">
            <div style={{ fontSize: "0.9em", color: "red" }}>
              회원 탈퇴를 위해 비밀번호를 입력해주세요 (구글 로그인시 비밀번호
              입력 불필요)
            </div>
            <div className="leave-info">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>아이디</strong>
                    </td>
                    <td>
                      <span>{getAuth().currentUser?.email}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>비밀번호</strong>
                    </td>
                    <td>
                      <input
                        type="password"
                        value={enteredPassword}
                        onChange={handlePasswordChange}
                        placeholder="이메일로 가입한 경우만 필요"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {error && (
              <div
                style={{ color: "red", marginTop: "10px", textAlign: "center" }}
              >
                {error}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="leave-check" onClick={handleWithdrawal}>
                탈퇴
              </button>
            </div>
          </div>
        )}
        {isWithdrawn && activeTab === "withdrawal" && (
          <div className="tab-content">
            <div>
              회원 탈퇴가 완료되었습니다. 더 이상 내역을 확인할 수 없습니다.
            </div>
          </div>
        )}
        {activeTab === "myDetails" && !isWithdrawn && (
          <div className="tab-content">나의 내역</div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
