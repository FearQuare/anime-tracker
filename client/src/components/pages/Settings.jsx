import ChangePassword from "../ChangePassword";

export default function Settings() {
    return (
        <div className="w-4/5 mt-3">
            <div className="bg-base-300 w-36 h-8 rounded-t-2xl flex items-center justify-center">Settings</div>
            <div className="bg-base-300 rounded-b-2xl rounded-tr-2xl">
                <ChangePassword />
            </div>
        </div>
    )
}