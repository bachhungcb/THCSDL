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
    <div className="login-container">
        <Form className="form-box"
          name="basic"
          // labelCol={{
          //   span: 8,
          // }}
          // wrapperCol={{
          //   span: 16,
          // }}
          // style={{
          //   maxWidth: 600,
          // }}
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
            // wrapperCol={{
            //   offset: 8,
            //   span: 16,
            // }}
          >
            <Button type="primary" htmlType="submit">
              <span>Log in</span>
            </Button>
          </Form.Item>
        </div>  
        <div className="register">
          <Form.Item
            // wrapperCol={{
            //   offset: 8,
            //   span: 16,
            // }}
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
  );
}

export default LoginForm;
