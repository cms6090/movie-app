import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseinit";

function Header() {
  const [user, setUser] = useState(null); // 로그인 상태 저장
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("로그아웃 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <p>로고</p>
        </Link>
      </div>
      <div className="other">
        <Link to="/movies">
          <div className="header-contents">
            <span className="material-symbols-outlined">movie</span>
            <span>영화</span>
          </div>
        </Link>
        <Link to="/ticket">
          <div className="header-contents">
            <span className="material-symbols-outlined">
              confirmation_number
            </span>
            <span>예매</span>
          </div>
        </Link>
        {user ? (
          <>
            <Link to="/mypage">
              <div className="header-contents">
                <span className="material-symbols-outlined">person</span>
                <span>MY 로고</span>
              </div>
            </Link>
            <div
              className="header-contents"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <span className="material-symbols-outlined">lock_open</span>
              <span>로그아웃</span>
            </div>
          </>
        ) : (
          // 로그아웃 상태
          <>
            <Link to="/login">
              <div className="header-contents">
                <span className="material-symbols-outlined">lock</span>
                <span>로그인</span>
              </div>
            </Link>
            <Link to="/signup">
              <div className="header-contents">
                <span className="material-symbols-outlined">person_add</span>
                <span>회원가입</span>
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
