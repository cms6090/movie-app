import React, { useState } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseinit";
import "./Withdrawal.css";

const Withdrawal = () => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setEnteredPassword(e.target.value);
    setError("");
  };

  const handleWithdrawal = async () => {
    const user = auth.currentUser;

    if (!user) {
      setError("로그인된 사용자가 없습니다.");
      return;
    }

    const providerData = user.providerData[0];
    try {
      if (providerData && providerData.providerId === "google.com") {
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, provider);
      } else {
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

      await deleteUser(user);
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setError("비밀번호가 일치하지 않습니다.");
      } else if (err.code === "auth/network-request-failed") {
        setError("네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.");
      } else {
        setError("회원 탈퇴에 실패하였습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="tab-content">
      <div style={{ fontSize: "0.9em", color: "red" }}>
        회원 탈퇴를 위해 비밀번호를 입력해주세요 (구글 로그인시 비밀번호 입력
        불필요)
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
        <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
          {error}
        </div>
      )}
      <div className="leave-container">
        <button className="leave-check" onClick={handleWithdrawal}>
          탈퇴
        </button>
      </div>
    </div>
  );
};

export default Withdrawal;
