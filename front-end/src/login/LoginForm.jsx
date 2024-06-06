import React, {useState} from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import memcho from "../assets/memcho.png";
import "./LoginForm.css";
function LoginForm() {
  
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const onFinish = async (values) => {
    

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: state.email,
        password: state.password,
      });

      if (response.data === 1) {
        console.log(JSON.stringify(state));
        localStorage.setItem("user", JSON.stringify(state));
        navigate("/");
      } else {
        console.log(response.data);
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
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
            type: "email", 
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Link to="/register">
          {" "}
          <img
            src={memcho}
            alt="Register Icon"
            style={{ marginRight: 8 }}
            sizes="16x16"
          />{" "}
          Doesn't have an account? Register here
        </Link>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
