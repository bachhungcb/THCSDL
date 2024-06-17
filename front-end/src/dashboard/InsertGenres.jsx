import React, { useState, useEffect } from 'react';
import { Form, Select, Button, notification } from 'antd';
import axios from 'axios';

const { Option } = Select;

function InsertGenres({ animeId }) {
    const [form] = Form.useForm();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/dashboard/genres')
            .then(response => setGenres(response.data))
            .catch(error => console.error(error));
    }, []);

    const onFinish = async (values) => {
        if (!values.genres || values.genres.length === 0) {
            notification.error({
                message: 'Error',
                description: 'Please select at least one genre.'
            });
            return;
        }
    
        values.animeId = animeId;
        try {
            const response = await axios.post('http://localhost:8080/dashboard/insertGenres', values);
            if (response.data.message === true) {
                notification.success({
                    message: 'Success',
                    description: 'Genres added successfully'
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Genres not added'
                });
            }
        } catch (error) {
            console.error('Failed to insert genres:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to add genres. Please try again later.'
            });
        }
    };
    

    return (
        <div style={{ padding: '50px' }}>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="genres" label="Genres" rules={[{ required: true }]}>
                    <Select mode="tags" allowClear placeholder="Select or type genres">
                        {genres.map(genre => (
                            <Option key={genre.genres_id} value={genre.genres}>
                                {genre.genres}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default InsertGenres;
