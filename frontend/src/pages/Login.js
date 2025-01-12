import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // 성공/실패 메시지
  const navigate = useNavigate(); // 홈으로 리다이렉트할 navigate 함수

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
        const accessToken = response.headers.get("Authorization"); // JWT 토큰은 Authorization 헤더에 저장
        console.log("JWT 토큰:", accessToken);

        // 액세스 토큰을 localStorage에 저장
        localStorage.setItem("accessToken", accessToken);

        setMessage("로그인 성공!");
        navigate("/");
      } else {
        const errorData = await response.json();
        setMessage(`로그인 실패: ${errorData.message || "오류 발생"}`);
      }
    } catch (error) {
      setMessage(`로그인 실패: ${error.message}`);
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                아이디
              </label>
              <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              로그인
            </button>
          </form>
          {message && (
              <p
                  className={`mt-4 text-center ${
                      message.includes("성공") ? "text-green-500" : "text-red-500"
                  }`}
              >
                {message}
              </p>
          )}
        </div>
      </div>
  );
}

export default Login;