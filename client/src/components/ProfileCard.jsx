import UploadProfilePicture from "./modals/UploadProfilePicture"

export default function ProfileCard({ userData, setUserData, setSectionSelected, sectionSelected }) {
    const handleSettingsSelected = () => {
        setSectionSelected('settings');
    }

    return (
        <div className="flex flex-col items-center h-full w-1/5">
            <h1 className="text-2xl mb-3">Profile Information</h1>
            <div className="card bg-base-300 w-full shadow-sm text-primary flex flex-col items-center p-3">
                <div className="card flex flex-col items-center">
                    <div className="avatar p-3">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                            {userData?.profilePicture ? <img src={userData.profilePicture} onClick={() => document.getElementById('upload_profile_picture_modal').showModal()} /> : <img src="default-profile-image.jpg" onClick={() => document.getElementById('upload_profile_picture_modal').showModal()} />}
                        </div>
                    </div>
                    <p className="text-base-content">{userData?.username}</p>
                </div>
                <div className="divider"></div>
                {sectionSelected == 'settings' ? <button className="btn disabled w-full h-8 rounded-lg flex justify-center items-center bg-primary hover:cursor-not-allowed">Settings</button> : <button className="btn text-base-content bg-base-100 w-full h-8 rounded-lg flex justify-center items-center hover:bg-primary hover:cursor-pointer" onClick={handleSettingsSelected}>Settings</button>}
            </div>
            <UploadProfilePicture setUserData={setUserData} />
        </div>
    )
}