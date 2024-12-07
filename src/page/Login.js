import React, { useState, useEffect } from 'react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors({ ...errors, [e.target.name]: '', general: '' }); 
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    const newErrors = { email: '', password: '', general: '' }; 

    if (!email) newErrors.email = '이메일을 입력하세요.';
    if (!password) newErrors.password = '비밀번호를 입력하세요.';

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors); 
      return;
    }

    // const loginData = { email, password }; // 로그인 데이터 객체 생성

    // try {
    //   const response = await fetch('http://localhost:3000/api/users/sign/signin', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(loginData), // 요청 본문에 로그인 데이터 포함
    //   });

    //   // 서버 응답이 성공적일 때
    //   if (response.ok) {
    //     const result = await response.json(); // 응답 본문을 JSON으로 파싱
    //     const accessToken = response.headers.get('Authorization').replace('Bearer ', ''); // 토큰 추출

    //     // 이메일과 권한이 응답에 존재하는지 확인
    //     if (result.user && result.user.email && result.user.permission) {
    //       alert('로그인에 성공했습니다.');

    //       // 세션 스토리지에 토큰, 이메일, 권한 저장
    //       sessionStorage.setItem('accessToken', accessToken);
    //       sessionStorage.setItem('userEmail', result.user.email); // 이메일 저장
    //       sessionStorage.setItem('userPermission', result.user.permission); // 권한 저장

    //       window.location.href = '/'; // 메인 페이지로 리디렉션
    //     } else {
    //       console.error('Invalid response format:', result);
    //       alert('로그인에 실패했습니다. 다시 시도해주세요.');
    //     }
    //   } else {
    //     const errorData = await response.json(); // 에러 응답 파싱
    //     console.error('Login failed:', errorData);
    //     setErrors({ ...errors, general: errorData.message }); // 일반적인 에러 메시지 설정
    //   }
    // } catch (error) {
    //   console.error('Network error:', error); // 네트워크 오류 처리
    //   setErrors({ ...errors, general: '네트워크 오류가 발생했습니다. 다시 시도해주세요.' }); // 네트워크 에러 메시지 설정
    // }
  };

  return (
    <div className="login-container">
      <div style={{ textAlign: 'center' }}>
        <div>logo</div>
      </div>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">
            이메일<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange(setEmail)}
            required
            placeholder="이메일을 입력하세요"
            style={{ border: '15px' }}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="input-group">
          <label htmlFor="password">
            비밀번호<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange(setPassword)}
            required
            style={{ border: '15px' }}
            placeholder="비밀번호를 입력하세요."
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        <button type="submit" className="login-button">
          로그인
        </button>
        {errors.general && <div className="error-message general-error">{errors.general}</div>}
      </form>
      <div className="signup-link">
        <p style={{ fontSize: '0.8em', marginBottom: '1.1em' }}>계정이 없으신가요?</p>
        <a href="./signup" style={{ fontSize: '0.9em' }}>
          이메일로 회원가입
        </a>
      </div>
    </div>
  );
}
