import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LuUserRoundPlus } from "react-icons/lu";
import { CiLock, CiUnlock, CiUser, CiBookmark } from "react-icons/ci";
import { BiCameraMovie } from "react-icons/bi";
import { IoTicketOutline } from "react-icons/io5";

function Header() {
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
        {/* <Link to='/mymovie'><CiUser  />
            <span>MY MOVIE</span></Link>
          <Link to='/logout'><div className="header-contents">
            <CiUnlock />
            <span>로그인</span>
          </div></Link> */}
      </div>
    </header>
  );
}

export default Header;
