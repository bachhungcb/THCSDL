import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Layout, Card, Avatar, Typography, Spin } from "antd";
import MainLayout from "../templates/MainLayout.jsx";

const { Title, Text } = Typography;

function Profile() {
  const { userID } = useParams();
  console.log(userID);
  const [profile, setProfile] = useState(null);
  const url = `http://localhost:8080/profile/`;

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
  }, [userID]); // Add userID to the dependency array to trigger re-fetch on ID change

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
        {profile.map((profile) => (
          <Card
            className="profile-card"
            key={profile.UserID}
            cover={
              <Avatar
                size={150}
                src={profile.avatar}
                alt="User Avatar"
                style={{ margin: "16px auto" }}
              />
            }
          >
            <Title level={2} style={{ textAlign: "center" }}>
              {profile.FullName}
            </Title>
            <Text strong>Email:</Text> <Text>{profile.Email}</Text>
            <br />
            <Text strong>Birthday:</Text>{" "}
            <Text>{new Date(profile.Birthday).toLocaleDateString()}</Text>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}

export default Profile;
