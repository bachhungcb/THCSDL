import axios from 'axios';

const BASE_URL = 'http://localhost:8080';  

const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const changeAvatar = async (userId, avatar) => {
  try {
    const response = await axios.put(`${BASE_URL}/profile/avatar`, { userId, avatar });
    return response.data;
  } catch (error) {
    console.error('Error changing avatar:', error);
    throw error;
  }
};

const changeBirthday = async (userId, birthday) => {
  try {
    const response = await axios.put(`${BASE_URL}/profile/birthday`, { userId, birthday });
    return response.data;
  } catch (error) {
    console.error('Error changing birthday:', error);
    throw error;
  }
};

const changeFullName = async (userId, fullName) => {
  try {
    const response = await axios.put(`${BASE_URL}/profile/fullname`, { userId, fullName });
    return response.data;
  } catch (error) {
    console.error('Error changing full name:', error);
    throw error;
  }
};

export {
  getUserById,
  changeAvatar,
  changeBirthday,
  changeFullName
};
