import { AuthContext } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import { useContext, useState } from "react";
import axios from "axios";

export default function ChangePassword() {
    const { user } = useContext(AuthContext);

    const { showAlert } = useAlert();

    const [passwordChangeFormData, setPasswordChangeFormData] = useState({
        oldPassword: '',
        newPassword: ''
    });

    const handlePasswordChange = (e) => {
        setPasswordChangeFormData({ ...passwordChangeFormData, [e.target.name]: e.target.value });
    };

    const handlePasswordChangeSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.token) return;

        try {
            const result = await axios.post('http://localhost:5000/api/user/currentUser/changePassword',
                passwordChangeFormData,
                {
                    headers: {
                        'Authorization': user.token,
                        'UserId': user.id
                    }
                });

            showAlert(result.data.message, 'success');

            setPasswordChangeFormData({
                oldPassword: '',
                newPassword: ''
            });

        } catch (e) {
            showAlert(e.response.data.message, 'error');
        }
    }

    return (
        <div className="pt-3 pl-3">
            <h1 className="text-2xl">Change Password</h1>
            <form onSubmit={handlePasswordChangeSubmit} className="mt-3 flex flex-col">
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
                        name="oldPassword"
                        placeholder='Old Password'
                        value={passwordChangeFormData.oldPassword}
                        onChange={handlePasswordChange}
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
                        name="newPassword"
                        placeholder='New Password'
                        value={passwordChangeFormData.newPassword}
                        onChange={handlePasswordChange}
                        minLength={8}
                        required
                    />
                </label>
                <button className='btn btn-primary w-64' type='submit'>Change Password</button>
            </form>
        </div>
    )
}