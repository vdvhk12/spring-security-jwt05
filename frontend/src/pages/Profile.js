import React, { useState, useEffect } from "react";
import { getMemberIdFromToken, getToken } from "../utils/tokenUtils";

function Profile() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = getMemberIdFromToken();
        const response = await fetch(`http://localhost:8080/api/v1/members/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `${getToken()}`,
          }
        });
        if (!response.ok) {
          setError("데이터를 불러오는 데 실패했습니다.");
          return;
        }
        const data = await response.json();
        setUsername(data.username);
        setNickname(data.nickname);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg font-medium text-gray-600">로딩 중...</div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500 text-lg font-medium">{error}</div>
        </div>
    );
  }

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">프로필</h1>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">사용자 이름</label>
            <p className="text-gray-800">{username}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">닉네임</label>
            <p className="text-gray-800">{nickname}</p>
          </div>
          <button
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              onClick={() => window.location.reload()}
          >
            새로고침
          </button>
        </div>
      </div>
  );
}

export default Profile;