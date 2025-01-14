import { jwtDecode } from "jwt-decode";

export function getMemberIdFromToken() {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  if(!accessToken) {
    throw new Error("토큰이 없습니다. 로그인이 필요합니다.");
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    return decodedToken.id;
  } catch (error) {
    console.log("토큰 디코딩 실패: ", error);
    return null;
  }
}

export function getToken() {
  return localStorage.getItem("accessToken");
}

export async function refreshAccessToken() {
  try {
    const response = await fetch('http://localhost:8080/auth/refresh', {
      method: 'POST',
      credentials: 'include'
    });

    if (!response.ok) {
      console.log("Failed to refresh token");
    }

    const newAccessToken = response.headers.get("Authorization"); // 서버에서 반환된 JWT 토큰
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Token refresh failed: ', error);
    throw error;
  }
}