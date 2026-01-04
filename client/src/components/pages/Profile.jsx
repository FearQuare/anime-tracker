import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const retrieveProfileData = async () => {
            try {
                console.log('Frontend: Attempting to fetch data ...');
                const result = await axios.get('http://localhost:5000/api/user/currentUser', {
                    headers: {
                        'Authorization': token
                    }
                });

                console.log(result)
            } catch (error) {
                console.log("Frontend: Error", error);
            }
        };

        retrieveProfileData()

    }, [navigate]);

    return (
        <div>
            Profile
        </div>
    )
}