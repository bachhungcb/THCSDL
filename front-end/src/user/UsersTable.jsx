import React, { useState, useEffect } from "react";
import { Table, Button, message, Avatar } from "antd";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to load users.");
      setLoading(false);
    }
  };

  const handleBanUser = async (userId) => {
    try {
      await axios.put("http://localhost:8080/ban", { userId });
      message.success("User banned successfully.");
      fetchUsers();
    } catch (error) {
      console.error("Error banning user:", error);
      message.error("Failed to ban user.");
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      await axios.put("http://localhost:8080/unban", { userId });
      message.success("User unbanned successfully.");
      fetchUsers();
    } catch (error) {
      console.error("Error unbanning user:", error);
      message.error("Failed to unban user.");
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "Avatar",
      key: "avatar",
      render: (text) => <Avatar src={text} />,
    },
    {
      title: "Full Name",
      dataIndex: "FullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          {record.Role !== "banned" ? (
            <Button onClick={() => handleBanUser(record.Id)}>Ban</Button>
          ) : (
            <Button onClick={() => handleUnbanUser(record.Id)}>Unban</Button>
          )}
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="Id"
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
}

export default UserList;
