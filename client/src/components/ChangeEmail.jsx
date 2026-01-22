import { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import axios from "axios";

export default function ChangeEmail() {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: ''
    })

    const { showAlert } = useAlert();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post('http://localhost:5000/api/user/currentUser/changeEmail',
                formData,
                {
                    headers: {
                        'Authorization': user.token,
                        'UserId': user.id
                    }
                });

            showAlert(result.data.message, 'success');

            setFormData({
                email: '',
            });
        } catch (e) {
            showAlert(e.response.data.message, 'error');
        }
    }

    return (
        <div className="pl-3">
            <h1 className="text-2xl">Change Email</h1>
            <form onSubmit={handleSubmit} className="mt-3 flex flex-col">
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
                <button className="btn btn-primary w-64" type="submit">Change Email</button>
            </form>
        </div>
    )
}