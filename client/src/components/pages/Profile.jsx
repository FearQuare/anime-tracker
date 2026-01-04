import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user || !user.token) {
            navigate('/login');
            return;
        }

        const retrieveProfileData = async () => {
            try {
                console.log('Frontend: Attempting to fetch data ...');
                const result = await axios.get('http://localhost:5000/api/user/currentUser', {
                    headers: {
                        'Authorization': user.token,
                        'UserId': user.id
                    }
                });

                console.log(result)
            } catch (error) {
                console.log("Frontend: Error", error);
            }
        };

        retrieveProfileData()

    }, [navigate, user]);

    return (
        <div>
            Profile
        </div>
    )
}