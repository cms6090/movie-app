import React, { useState, useEffect } from "react";
import "./Login.css";
import google from "../assets/img/google.png";
import { auth } from "../firebaseinit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = { email: "", password: "", general: "" };

    if (!email) newErrors.email = "이메일을 입력하세요.";
    if (!password) newErrors.password = "비밀번호를 입력하세요.";

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인에 성공하였습니다.");
      navigate("/");
    } catch (error) {
      console.error("로그인 에러:", error);

      switch (error.code) {
        case "auth/user-not-found":
          newErrors.general = "해당 이메일로 가입된 사용자가 없습니다.";
          break;
        case "auth/wrong-password":
          newErrors.general = "비밀번호가 잘못되었습니다.";
          break;
        case "auth/invalid-email":
          newErrors.general = "유효하지 않은 이메일 주소입니다.";
          break;
        case "auth/invalid-credential":
          newErrors.general =
            "잘못된 자격 증명입니다. 이메일 또는 비밀번호를 확인하세요.";
          break;
        case "auth/too-many-requests":
          newErrors.general =
            "잠시 후 다시 시도해주세요. 너무 많은 로그인 시도가 감지되었습니다.";
          break;
        default:
          newErrors.general = "로그인에 실패하였습니다. 다시 시도해주세요.";
          break;
      }

      setErrors(newErrors);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate("/");
    } catch (error) {
      console.error("구글 로그인 에러:", error);
      setErrors({
        ...errors,
        general: "구글 로그인을 실패하였습니다. 다시 시도해주세요.",
      });
    }
  };

  return (
    <div className="login-container">
      <div style={{ textAlign: "center" }}>
        <div>logo</div>
      </div>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">
            이메일<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange(setEmail)}
            required
            placeholder="이메일을 입력하세요"
            style={{ border: "15px" }}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="input-group">
          <label htmlFor="password">
            비밀번호<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange(setPassword)}
            required
            style={{ border: "15px" }}
            placeholder="비밀번호를 입력하세요."
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        <button
          className="google-login-button"
          type="button"
          onClick={handleGoogleLogin}
        >
          <img
            src={google}
            alt="구글"
            style={{
              height: "16px",
              width: "16px",
              marginRight: "1em",
              backgroundColor: "white",
            }}
          />
          <span>구글 계정으로 로그인</span>
        </button>
        <button type="submit" className="login-button">
          로그인
        </button>
        {errors.general && (
          <div className="error-message general-error">{errors.general}</div>
        )}
      </form>
      <div className="signup-link">
        <p style={{ fontSize: "0.8em", marginBottom: "1.1em" }}>
          계정이 없으신가요?
        </p>
        <a href="./signup" style={{ fontSize: "0.9em" }}>
          이메일로 회원가입
        </a>
      </div>
    </div>
  );
}
