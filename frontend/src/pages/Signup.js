import React, { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // 성공/실패 메시지 상태

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, nickname, password }), // 요청 데이터
      });

      if (response.ok) {
        setMessage("회원가입 성공!");
      } else {
        const errorData = await response.json();
        setMessage(`회원가입 실패: ${errorData.message || "오류 발생"}`);
      }
    } catch (error) {
      setMessage(`회원가입 실패: ${error.message}`);
    }
  };

  return (
      <div>
        <h2>회원가입</h2>
        <form onSubmit={handleSignup}>
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
            <label>닉네임:</label>
            <input
                type="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
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
          <button type="submit">회원가입</button>
        </form>
        {message && <p>{message}</p>}
      </div>
  );
}

export default Signup;