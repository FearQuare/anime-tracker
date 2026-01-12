import UploadProfilePicture from "./modals/UploadProfilePicture"

export default function ProfileCard({ userData }) {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-3">Profile Information</h1>
            <div className="card bg-base-300 w-96 shadow-sm text-primary flex flex-col items-center p-3">
                <div className="card w-56 flex flex-col items-center">
                    <div className="avatar p-3">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                            {userData?.profileImage ? <img src={userData.profileImage}/> : <img src="default-profile-image.jpg" onClick={()=>document.getElementById('upload_profile_picture_modal').showModal()}/>}
                        </div>
                    </div>
                    <p className="mb-3">{userData?.username}</p>
                </div>
            </div>
            <UploadProfilePicture />
        </div>
    )
}