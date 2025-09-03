import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/students',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Handle global errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

export const studentAPI = {
    // Upload student data (Excel/CSV)
    uploadFile: async (formData) => {
        return API.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    // Get all students
    getStudents: async () => {
        return API.get('/list');
    },

    // Update student marks
    updateStudent: async (studentId, data) => {
        return API.put(`/${studentId}`, data);
    },

    // Delete student
    deleteStudent: async (studentId) => {
        return API.delete(`/${studentId}`);
    }
};

export default studentAPI;