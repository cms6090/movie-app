import React from "react";
import "./Footer.css"; // CSS 스타일을 위한 파일
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import { IoIosCall } from "react-icons/io";

const Footer = () => {
  // 버튼에 적용할 공통 스타일 정의
  const buttonStyle = {
    color: "rgb(140, 139, 139)",
    fontSize: "0.9em",
    marginRight: "2%",
  };

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>© 2024 DJ COMPANY Corp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
