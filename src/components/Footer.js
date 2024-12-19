import React from "react";
import "./Footer.css";
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import { IoIosCall } from "react-icons/io";

const Footer = () => {
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
