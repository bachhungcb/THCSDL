import React from "react";
import { Button, Checkbox, Form, Input, Space } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import memcho from "../assets/memcho.png";
import MainLayout from "../templates/MainLayout";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();

  const onFinish = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/login", data);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else if (response.status === 401) {
        alert("Login failed! Please check your email and password.");
      } else {
        alert("Login failed! Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Please try again later.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MainLayout>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!", type: "email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <div className="register-field">
          <Space wrap={true}>
            <Link to="/register">Don't have an account? Register here</Link>
            <img
              className="memcho-icon"
              src={memcho}
              alt="Register Icon"
              style={{ marginRight: 8 }}
            />
          </Space>
        </div>
      </Form.Item>
    </Form>
    </MainLayout>
  );
}

export default LoginForm;
