import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // 성공/실패 메시지

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // 성공적으로 응답을 받았을 때
        const jwtToken = response.headers.get("Authorization"); // JWT 토큰은 Authorization 헤더에 저장
        const data = await response.json(); // JSON 응답 데이터 (refreshToken 포함)

        console.log("JWT 토큰:", jwtToken);
        console.log("Refresh 토큰:", data.refreshToken);

        setMessage("로그인 성공!");
      } else {
        const errorData = await response.json();
        setMessage(`로그인 실패: ${errorData.message || "오류 발생"}`);
      }
    } catch (error) {
      setMessage(`로그인 실패: ${error.message}`);
    }
  };

  return (
      <div>
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>아이디:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
          </div>
          <div>
            <label>비밀번호:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          <button type="submit">로그인</button>
        </form>
        {message && <p>{message}</p>}
      </div>
  );
}

export default Login;