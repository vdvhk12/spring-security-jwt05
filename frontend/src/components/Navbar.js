import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <h1 className="text-xl font-bold cursor-pointer">JWT 프로젝트</h1>
          </Link>
          <div className="space-x-4">
            {!isAuthenticated ? (
                <>
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
                </>
            ) : (
                <>
                  <Link to="/profile">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                      프로필
                    </button>
                  </Link>
                  <button
                      onClick={logout}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    로그아웃
                  </button>
                </>
            )}
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
