import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { showAlert } = useAlert();

    // Handle input changes
    // This updates the state whenever you type in a box
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    // Handle Form Submission (The API Call)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // connection to the backend we just built
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);

            // If successful, alert the user
            showAlert(response.data.message, 'success');
            console.log('Success:', response.data);
        } catch (error) {
            // If error, show the error message form the backend
            showAlert(error.response?.data?.message || 'An error occurred', 'error');
            console.error('Error:', error);
        }

        setFormData({username: '', email: '', password: ''});
    };
    return (
        <div className='w-full flex-1 flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-5 text-primary'>Create Account</h1>
            <form onSubmit={handleSubmit} className='bg-base-200 rounded-2xl p-8 flex flex-col justify-center items-center'>
                <label className='input validator mb-2'>
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </g>
                    </svg>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                        pattern="[A-Za-z][A-Za-z0-9\-]*"
                        minlength="3"
                        maxlength="30"
                        title="Only letters, numbers or dash"
                    />
                </label>
                <label className='input validator mb-2'>
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className='input validator mb-2'>
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                            ></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button className='btn btn-soft btn-primary' type='submit'>Sign Up</button>
                <p className='mt-3 text-sm'>Already have an account? <a href='/login' className='link-primary'>Login</a></p>
            </form>
        </div>
    );
}