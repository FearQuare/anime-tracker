import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import ProfileCard from '../ProfileCard';
import Settings from './Settings';

export default function Profile() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [selectedSection, setSectionSelected] = useState('');
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const MD_BREAKPOINT = 768;

    useEffect(() => {
        if (!user || !user.token) {
            navigate('/login');
            return;
        }

        const retrieveProfileData = async () => {
            try {
                const result = await axios.get('http://localhost:5000/api/user/currentUser', {
                    headers: {
                        'Authorization': user.token,
                        'UserId': user.id
                    }
                });

                setUserData(result.data);
            } catch (error) {
                console.log("Frontend: Error", error);
            }
        };

        retrieveProfileData();

        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < MD_BREAKPOINT);
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, [navigate, user]);

    return (
        <div className='flex gap-3 m-3'>
            {(selectedSection && isSmallScreen) ? <></> : <ProfileCard userData={userData} setUserData={setUserData} setSectionSelected={setSectionSelected} sectionSelected={selectedSection} />}
            {selectedSection == 'settings' ? <Settings setSectionSelected={setSectionSelected} /> : <></>}
        </div>
    )
}