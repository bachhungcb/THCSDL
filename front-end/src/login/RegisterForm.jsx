import React from "react";
import { Button, Form, Input, DatePicker } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import memcho from "../assets/memcho.png";
import MainLayout from "../templates/MainLayout";   
import "./LoginForm.css";

function RegisterForm() {
  const navigate = useNavigate();

  const onFinish = async (data) => {
    try {
      // Convert DatePicker value to a string format accepted by the backend
      const formattedData = {
        ...data,
        birthday: data.birthday.format("YYYY-MM-DD"),
      };
      
      const response = await axios.post("http://localhost:8080/register", formattedData);
      console.log("Success:", response.data);
      const { success } = response.data;

      if (success===true) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(`Registration failed! ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Please try again later.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    alert("Please check the fields and try again.");
  };

  return (
    <MainLayout>
      <div className="login-container">
        <Form className="form-box"
          name="register"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h2 className="registertitle">Register</h2>
          <div className="inputbox">
            <Form.Item
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </div>
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
          <div className="inputbox">
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          </div>
          <div className="inputbox">
            <Form.Item
              name="birthday"
              rules={[
                {
                  required: true,
                  message: "Please input your date of birth!",
                },
              ]}
            >
              <DatePicker placeholder="Date of Birth" />
            </Form.Item>
          </div>
          <div className="registerbutton">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <span>Register</span>
              </Button>
            </Form.Item>
          </div>
          <div className="register">
            <Form.Item>
              Already have an account? 
              <Link to="/login" style={{marginLeft: 8}} className="registertext"> 
                Login here
              </Link>{" "}
              <img
                src={memcho}
                alt="Login Icon"
                style={{ marginLeft: 8 }}
              />{" "}
            </Form.Item>
          </div>
        </Form>
      </div>
    </MainLayout>
  );
}

export default RegisterForm;
