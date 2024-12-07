import React, { useState, useEffect } from "react";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    userName: "",
    phoneNumber: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateFields = () => {
    const newErrors = {
      email: "",
      password: "",
      userName: "",
      phoneNumber: "",
    };

    if (!email) {
      newErrors.email = "이메일을 입력하세요.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "유효한 이메일 주소를 입력하세요.";
    }

    if (!password) {
      newErrors.password = "비밀번호를 입력하세요.";
    } else if (password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다.";
    }

    if (!userName) {
      newErrors.userName = "사용자 이름을 입력하세요.";
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "휴대폰 번호를 입력하세요.";
    } else if (!/^\d{10,11}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "유효한 휴대폰 번호를 입력하세요.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateFields()) {
      console.log("Form submitted:", {
        email,
        password,
        userName,
        phoneNumber,
      });
      alert("가입이 완료되었습니다!");
    }
  };

  const isFormValid = () => {
    return email && password && password.length >= 6 && userName && phoneNumber;
  };

  return (
    <div className="verification-container">
      <h5>가입을 위해 필수 정보를 입력해 주세요.</h5>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="email">
          <label htmlFor="email">
            이메일<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
            required
          />
          {isSubmitted && errors.email && (
            <div className="error-message">{errors.email}</div>
          )}
        </div>
        <div className="password">
          <label htmlFor="password">
            비밀번호<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
          {isSubmitted && errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        <div className="user-name">
          <label htmlFor="userName">
            사용자 이름<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="사용자 이름"
            required
          />
          {isSubmitted && errors.userName && (
            <div className="error-message">{errors.userName}</div>
          )}
        </div>
        <div className="telno">
          <label htmlFor="phone">
            휴대폰 번호<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="01012345678"
            required
          />
          {isSubmitted && errors.phoneNumber && (
            <div className="error-message">{errors.phoneNumber}</div>
          )}
        </div>
        <button
          type="submit"
          className={`send-button ${!isFormValid() ? "disabled" : ""}`}
          disabled={!isFormValid()}
        >
          확인
        </button>
      </form>
    </div>
  );
};

export default Signup;
