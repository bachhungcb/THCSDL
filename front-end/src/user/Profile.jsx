import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Layout, Card, Avatar, Typography, Spin, Tabs, Input, Button, Form, message } from "antd";
import MainLayout from "../templates/MainLayout.jsx";
import FavouriteTable from "../table/FavouriteTable.jsx";
import FavouriteCharacterTable from "../table/FavouriteCharactersTable.jsx";
import UsersTable from "./UsersTable.jsx";
import "./Profile.css";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

function Profile() {
  const { userID } = useParams();
  const [profile, setProfile] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [editingBirthday, setEditingBirthday] = useState(false);
  const [avatarLink, setAvatarLink] = useState("");
  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const url = `http://localhost:8080/profile/`;
  const userRole = sessionStorage.getItem("userRole");
  const userPassword = sessionStorage.getItem("password").replace(/"/g, '');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${url}${userID}`);
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userID]);

  const updateProfile = async (field, value) => {
    try {
      const response = await axios.put(`http://localhost:8080/profile/${field}`, {
        userId: userID,
        [field]: value
      });
      message.success(`Updated ${field} successfully`);
      setProfile((prevProfile) =>
        prevProfile.map((item) =>
          item.Id === userID ? { ...item, [field]: value } : item
        )
      );
    } catch (error) {
      console.error(error);
      message.error(`Failed to update ${field}`);
    }
  };

  const onFinishChangePassword = async () => {
    console.log("Current Password:", currentPassword);
    if (currentPassword !== userPassword) {
      message.error("Current password is incorrect");
      return;
    }

    try {
      console.log("New password:", newPassword);
      const response = await axios.put(`http://localhost:8080/profile/password`, {
        userId: userID,
        newPassword: newPassword
      });
      sessionStorage.setItem("password", JSON.stringify(newPassword));
      message.success("Password updated successfully");
      setChangePasswordVisible(false);
      setNewPassword(""); 
      setConfirmNewPassword(""); 
    } catch (error) {
      console.error(error);
      message.error("Failed to update password");
    }
  };

  if (!profile) {
    return (
      <MainLayout>
        <Layout.Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Spin size="large" />
        </Layout.Content>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="profile-container">
        <Tabs defaultActiveKey="profile" className="profile-tabs">
          <TabPane tab="Profile" key="profile">
            {profile.map((profileItem) => (
              <Card
                className="profile-card"
                key={profileItem.Id}
                cover={
                  <div style={{ textAlign: "center" }} className="useravatarcontainer">
                    <Avatar
                      className="useravatar"
                      size={150}
                      src={profileItem.Avatar}
                      alt="User Avatar"
                    />
                    {showAvatarInput && (
                      <div style={{ marginTop: 10 }} className="avtinput">
                        <Input
                          placeholder="Enter avatar link"
                          value={avatarLink}
                          onChange={(e) => setAvatarLink(e.target.value)}
                          style={{ width: "250px", marginTop: "20px" }}
                        />
                        <Button
                          type="primary"
                          onClick={() => {
                            updateProfile("avatar", avatarLink);
                            setShowAvatarInput(false);
                          }}
                          className="cofbtn"
                        >
                          Confirm
                        </Button>
                      </div>
                    )}
                    {!showAvatarInput && (
                      <Button
                        type="primary"
                        onClick={() => setShowAvatarInput(true)}
                        className="changeavtbtn"
                      >
                        Change Avatar
                      </Button>
                    )}
                  </div>
                }
              >
              
                <Title level={2} style={{ textAlign: "center" }} className="username">
                  {editingName ? (
                    <Input
                      defaultValue={profileItem.FullName}
                      onBlur={(e) => {
                        updateProfile("fullName", e.target.value);
                        setEditingName(false);
                      }}
                      autoFocus
                      style={{width: "200px", marginBottom: "10px"}}
                    />
                  ) : (
                    <Paragraph
                      editable={{ onStart: () => setEditingName(true) }}
                    >
                      {profileItem.FullName}
                    </Paragraph>
                  )}
                </Title>
                <div className="profile-details">
                  <div className="profile-item">
                    <Text strong>Email:</Text><br /> <Text>{profileItem.Email}</Text>
                  </div>
                  <div className="profile-item">
                    <span className="dark">Birthday: </span>
                    <span style={{width: "100px"}}>
                    {editingBirthday ? (
                      <Input
                        type="date"
                        defaultValue={new Date(profileItem.Birthday).toISOString().split("T")[0]}
                        onBlur={(e) => {
                          updateProfile("birthday", e.target.value);
                          setEditingBirthday(false);
                        }}
                        autoFocus
                      />
                    ) : (
                      <Paragraph
                        editable={{ onStart: () => setEditingBirthday(true) }}
                      >
                        {new Date(profileItem.Birthday).toLocaleDateString()}
                      </Paragraph>
                    )}
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: "20px" }}>
              {!changePasswordVisible && (
                <Button type="primary" onClick={() => setChangePasswordVisible(true)} className="changepassbtn">
                  Change Password
                </Button>
              )}
              {changePasswordVisible && (
                <Form
                  name="changePasswordForm"
                  onFinish={onFinishChangePassword}
                  style={{ marginTop: 20 }}
                >
                  <Form.Item
                    name="currentPassword"
                    rules={[
                      { required: true, message: "Please input your current password!" }
                    ]}
                    style={{ width: "300px", margin: "20px auto"}}
                  >
                    <Input.Password
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    rules={[
                      { required: true, message: "Please input your new password!" },
                      { min: 6, message: "Password must be at least 6 characters" }
                    ]}
                    style={{ width: "300px", margin: "20px auto"}}
                  >
                    <Input.Password
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your new password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                      }),
                    ]}
                    style={{ width: "300px", margin: "20px auto"}}
                  >
                    <Input.Password
                      placeholder="Confirm New Password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="changepassbtn">
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </div>
              </Card>
            ))}
            
          </TabPane>
          <TabPane tab="Your favourite list" key="favourite">
            <FavouriteTable userID={userID} />
          </TabPane>
          <TabPane tab="Your favourite characters" key="favourite-character">
            <FavouriteCharacterTable userID={userID} />
          </TabPane>
          {userRole === `"admin"` && (
            <TabPane tab="Current user list" key="userlist">
              <UsersTable />
            </TabPane>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Profile;
