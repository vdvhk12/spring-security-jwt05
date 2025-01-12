import React from "react";

function Home() {
  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center">
        <div className="bg-white p-8 rounded shadow-md w-3/4 md:w-1/2">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">환영합니다!</h1>
          <p className="text-gray-700 mb-6">
            이 페이지는 JWT를 사용하여 구현한 간단한 회원 시스템 프로젝트입니다.
            로그인하거나 회원가입 후 다양한 기능을 이용해보세요.
          </p>
          <div className="flex justify-center space-x-4">
            <img
                src={`https://picsum.photos/300/300?random=${Math.random()}`}
                alt="Random Example 1"
                className="rounded shadow-md w-32 h-32"
            />
            <img
                src={`https://picsum.photos/300/300?random=${Math.random()}`}
                alt="Random Example 2"
                className="rounded shadow-md w-32 h-32"
            />
          </div>
        </div>
      </div>
  );
}

export default Home;