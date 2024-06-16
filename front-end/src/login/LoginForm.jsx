import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import memcho from "../assets/memcho.png";
import MainLayout from "../templates/MainLayout";
import "./LoginForm.css";

function LoginForm() {
  const [login, setLogin] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/login", data);
      setLogin(response.data); 

      if (response.data.loginSuccessful) {
        sessionStorage.setItem("userID", JSON.stringify(response.data.userID));
        sessionStorage.setItem("userRole", JSON.stringify(response.data.userRole));
        sessionStorage.setItem("password", JSON.stringify(response.data.userPassword));
        navigate("/");
      } else {
        alert("Login failed! Please check your email and password.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Please try again later.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    alert("Login failed! Please check your email and password.");
  };

  return (
    <MainLayout>
      <div className="login-container">
        <Form
          className="form-box"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h2 className="logintitle">Login</h2>
          <div className="inputbox">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </div>
          <div className="inputbox">
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </div>
          <div className="remember">
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox className="rememberme">Remember me</Checkbox>
            </Form.Item>
          </div>
          <div className="loginbutton">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <span>Log in</span>
              </Button>
            </Form.Item>
          </div>
          <div className="register">
            <Form.Item>
              Don't have an account?
              <Link
                to="/register"
                style={{ marginLeft: 8 }}
                className="registertext"
              >
                Register here
              </Link>{" "}
              <img src={memcho} alt="Register Icon" style={{ marginLeft: 8 }} />{" "}
            </Form.Item>
          </div>
        </Form>
        {login && (
          <div>
            <p>Login Successful: {login.loginSuccessful.toString()}</p>
            <p>User ID: {login.userID}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default LoginForm;
