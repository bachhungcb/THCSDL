import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./LoginButton.css";

function LoginButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra nếu user đã đăng nhập từ localStorage
        const user = localStorage.getItem("user");
        if (user) {
            setIsLoggedIn(true);
            const parsedUser = JSON.parse(user); // assuming the user is stored as a JSON string
            setUserId(parsedUser.Id);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
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
                    <Button type="primary" style={{ marginRight: 8 }} onClick={() => navigate("/login")}>
                        Login
                    </Button>
                    <Button onClick={() => navigate("/register")}>
                        Sign Up
                    </Button>
                </>
            )}
        </div>
    );
}

export default LoginButton;
