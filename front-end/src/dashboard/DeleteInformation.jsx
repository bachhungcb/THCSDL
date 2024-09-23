import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const DeleteAnimeForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:8080/dashboard/deleteAnime`, {
        data: {
          animeId: values.animeId,
        },
      });
      if (response.status === 200 && response.data.message === true) {
        message.success('Anime deleted successfully');
      } else {
        message.error('Failed to delete anime');
      }
    } catch (error) {
      console.error('Failed to delete anime:', error);
      message.error('Failed to delete anime. Please try again later.');
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="inline">
      <Form.Item
        label="Anime ID"
        name="animeId"
        rules={[{ required: true, message: 'Please input the anime ID' }]}
      >
        <Input placeholder="Enter Anime ID" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Delete Anime
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeleteAnimeForm;
