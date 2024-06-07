import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./LoginButton.css";

function LoginButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu user đã đăng nhập từ localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (<div className ="user-profile">
    {isLoggedIn ? (
      <>
        <Button
          type="primary"
          style={{ marginRight: 8 }}
          onClick={() => navigate("/profile")}
        >
          Profile
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </>
    ) : (<>
      <Button type="primary" style={{ marginRight: 8 }} onClick={() => navigate("/login")}>
        Login
      </Button>
      <Button onClick={() => navigate("/register")}>
        Sign Up
      </Button>
      </>
      
    )}
  </div>)
}

export default LoginButton;