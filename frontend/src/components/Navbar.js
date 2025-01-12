import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-xl font-bold cursor-pointer">JWT 프로젝트</h1>
        </Link>
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              로그인
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              회원가입
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;