import ThemeToggle from "../ThemeToggle";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogIn = () => {
        navigate('/login')
    }

    const handleRedirectMainPage = () => {
        navigate('/')
    }

    return (
        <div className="navbar bg-primary text-primary-content rounded-b-md">
            <div className="navbar-start">
                <button onClick={handleRedirectMainPage}>
                    <img
                        src='/logo.svg'
                        alt="Anime Tracker Logo"
                        className="w-16"
                    />
                </button>
            </div>

            <div className="navbar-end">
                {user ? <button className="btn btn-soft btn-primary" onClick={logout}>Log Out</button> : <button className="btn btn-soft btn-primary" onClick={handleLogIn}>Login</button>}
                <ThemeToggle />
            </div>
        </div>
    )
}