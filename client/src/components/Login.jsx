import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Hook to move user to another page
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData)

            // Save the token to LocalStorage (browser memory)
            localStorage.setItem('token', response.data.token);

            alert('Login Successful!');
            console.log('Logged in:', response.data);

            // Redirect user to home page (we will set this up next);
            navigate('/');

        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div></div>
    )
}