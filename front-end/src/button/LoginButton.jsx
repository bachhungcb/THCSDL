import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./LoginButton.css";

function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("userID");
    if (user) {
      const parsedUser = JSON.parse(user);

      setIsLoggedIn(true);
      setUserId(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserId(null);
    navigate("/login");
  };

  return (
    <div className="user-profile">
      {isLoggedIn ? (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => navigate(`/profile/${userId}`)}
          >
            Profile
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <>
          <Button
            className="loginbtn"
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button className="signupbtn" onClick={() => navigate(`/register`)}>
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
}

export default LoginButton;
