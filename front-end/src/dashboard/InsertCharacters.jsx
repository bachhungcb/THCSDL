import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

function InsertCharacter({ animeId }) {
    const [form] = Form.useForm();
    const [characters, setCharacters] = useState([{ Name: '', Profile: '', Description: '', Role: '' }]);

    const addCharacter = () => {
        setCharacters([...characters, { Name: '', Profile: '', Description: '', Role: '' }]);
    };

    const handleCharacterChange = (index, field, value) => {
        const newCharacters = [...characters];
        newCharacters[index][field] = value;
        setCharacters(newCharacters);
    };

    const onFinish = async (values) => {
        values.animeId = animeId;
        values.characters = characters;

        try {
            const response = await axios.post(`http://localhost:8080/dashboard/insertCharacters`, values);
            if (response.status === 200) {
                notification.success({
                    message: 'Success',
                    description: response.data.message
                });
                form.resetFields();
                setCharacters([{ Name: '', Profile: '', Description: '', Role: '' }]);
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Failed to add characters to anime'
                });
            }
        } catch (error) {
            console.error('Failed to insert characters:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to add characters. Please try again later.'
            });
        }
    };

    return (
        <div style={{ padding: '50px' }}>
            <Form form={form} onFinish={onFinish} layout="vertical">
                {characters.map((character, index) => (
                    <div key={index}>
                        <Form.Item label={`Character Name ${index + 1}`} required>
                            <Input
                                value={character.Name}
                                onChange={(e) => handleCharacterChange(index, 'Name', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label={`Character Profile ${index + 1}`} required>
                            <TextArea
                                value={character.Profile}
                                rows={2}
                                onChange={(e) => handleCharacterChange(index, 'Profile', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label={`Character Description ${index + 1}`} required>
                            <TextArea
                                value={character.Description}
                                rows={2}
                                onChange={(e) => handleCharacterChange(index, 'Description', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label={`Character Role ${index + 1}`} required>
                            <Input
                                value={character.Role}
                                onChange={(e) => handleCharacterChange(index, 'Role', e.target.value)}
                            />
                        </Form.Item>
                    </div>
                ))}
                <Form.Item>
                    <Button type="dashed" onClick={addCharacter}>Add Another Character</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default InsertCharacter;
