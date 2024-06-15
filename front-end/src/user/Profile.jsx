import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Layout, Card, Avatar, Typography, Spin, Tabs } from "antd";
import MainLayout from "../templates/MainLayout.jsx";
import FavouriteTable from "../table/FavouriteTable.jsx";
import UsersTable from "./UsersTable.jsx";
import "./Profile.css";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function Profile() {
  const { userID } = useParams();
  const [profile, setProfile] = useState(null);
  const url = `http://localhost:8080/profile/`;
  const userRole = sessionStorage.getItem("userRole");
  console.log(userRole);

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
                  <Avatar className="useravatar"
                    size={150}
                    src={profileItem.Avatar}
                    alt="User Avatar"
                  />
                }
              >
                <Title level={2} style={{ textAlign: "center" }} className="username">
                  {profileItem.FullName}
                </Title>
                <div className="profile-details">
                  <div className="profile-item">
                    <Text strong>Email:</Text> <Text>{profileItem.Email}</Text>
                  </div>
                  <div className="profile-item">
                    <Text strong>Birthday:</Text>{" "}
                    <Text>
                      {new Date(profileItem.Birthday).toLocaleDateString()}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </TabPane>
          <TabPane tab="Your favourite list" key="favourite">
            <FavouriteTable userID={userID} />
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
