import ChangeEmail from "../ChangeEmail";
import ChangePassword from "../ChangePassword";
import { CircleX } from "lucide-react";

export default function Settings({ setSectionSelected }) {
    const handleClose = () => {
        setSectionSelected('');
    }
    return (
        <div className="w-full md:w-7/10 lg:w-4/5 mt-3">
            <div className="bg-base-300 w-36 h-8 rounded-t-2xl flex items-center justify-around">
                <p>Settings</p>
                <CircleX size={16} className="hover:cursor-pointer" onClick={handleClose}/>
            </div>
            <div className="bg-base-300 rounded-b-2xl rounded-tr-2xl pb-5">
                <ChangePassword />
                <div className="divider"></div>
                <ChangeEmail />
            </div>
        </div>
    )
}