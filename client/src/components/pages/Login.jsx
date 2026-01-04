import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';

export default function Login() {
    // Hook to move user to another page
    const navigate = useNavigate();

    const { login, user } = useContext(AuthContext);

    const { showAlert } = useAlert();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData)

            // Save the token to LocalStorage (browser memory)
            login(response.data.token, response.data.user);

            showAlert('Login Successful!', 'success');

            navigate('/');

        } catch (error) {
            showAlert(error.response?.data?.message || 'Login failed', 'error');
        }
    };

    return (
        <div className='flex-1 w-full flex flex-col justify-center items-center'>
            <h1 className='text-3xl mb-5 text-primary'>Login</h1>
            <form onSubmit={handleSubmit} className='bg-base-200 p-8 rounded-2xl flex flex-col justify-center items-center'>
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
                        vaue={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button className='btn btn-soft btn-primary' type='submit'>Login</button>
                <p className='mt-3 text-sm'>Don't have an account? <a href='/signup' className='link-primary'>Sign Up</a></p>
            </form>
        </div>
    )
}