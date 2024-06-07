import React, {useState} from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import memcho from "../assets/memcho.png";
import MainLayout from "../templates/MainLayout";   
import "./LoginForm.css";
function LoginForm() {
  
  const [state, setState] = useState({
    email: "",
    password: ""
  });

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
    alert("Login failed! Please check your email and password.");
  };

  return (
    <MainLayout>
    <div className="login-container">
        <Form className="form-box"
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
              label={<label className="custom-label">Email</label>}
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
        </div>
        <div className="inputbox">
          <Form.Item
            label={<label className="custom-label">Password</label>}
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
        <div  className="loginbutton">
          <Form.Item
          >
            <Button type="primary" htmlType="submit">
              <span>Log in</span>
            </Button>
          </Form.Item>
        </div>  
        <div className="register">
          <Form.Item
          >
              Doesn't have an account? 
            <Link to="/register" style={{marginLeft: 8}} className="registertext"> 
              Register here
            </Link>
            {" "}
              <img
                src={memcho}
                alt="Register Icon"
                style={{ marginLeft: 8 }}
                // sizes="16x16"
              />{" "}
          </Form.Item>
        </div>
        </Form>  
    </div>
    </MainLayout>
  );
}

export default LoginForm;
