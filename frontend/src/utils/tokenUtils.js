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