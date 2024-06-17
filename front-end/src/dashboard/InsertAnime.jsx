import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";

const { TextArea } = Input;

function InsertAnime({ setAnimeId }) {
  const [form] = Form.useForm();

  const onFinish =async (values) => {
     const response =await axios.post("http://localhost:8080/dashboard/insertAnime", values)
     if (response.data.message === true) {
       setAnimeId(response.data.animeId)
       notification.success({
         message: "Success",
         description: "Anime added successfully"
       });
     }
  };

  return (
    <div style={{ padding: "50px" }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="synopsis"
          label="Synopsis"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="age_requirement"
          label="Age Requirement"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="anime_type"
          label="Anime Type"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="episodes"
          label="Episodes"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="animePoster"
          label="Anime Poster URL"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="nameURL" label="Name URL" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="scores" label="Scores" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="ranks" label="Ranks" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="popularity"
          label="Popularity"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="favourite"
          label="Favourite"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="stat" label="Status" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="aired_from"
          label="Aired From"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="aired_to"
          label="Aired To"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="premiered"
          label="Premiered"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default InsertAnime;
