import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseinit";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateFields = () => {
    const newErrors = {
      email: "",
      password: "",
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

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateFields()) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("회원가입에 성공하였습니다.");
        navigate("/");
      } catch (error) {
        console.error("회원가입 에러:", error);
        if (error.code === "auth/email-already-in-use") {
          setErrors({ ...errors, email: "이미 사용 중인 이메일 주소입니다." });
        } else {
          alert("회원가입 중 오류가 발생했습니다. 다시 시도하세요.");
        }
      }
    }
  };

  const isFormValid = () => {
    return email && password && password.length >= 6;
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
            비밀번호<span style={{ color: "red" }}>*(비밀번호는 6자 이상이어야 합니다.)</span>
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
