import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
      <div>
        <h1>홈페이지</h1>
        <nav>
          <Link to="/login">
            <button>로그인</button>
          </Link>
          <Link to="/signup">
            <button>회원가입</button>
          </Link>
        </nav>
      </div>
  );
}

export default Home;