import React from 'react';
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
    return (
        <div className="navbar bg-primary text-primary-content rounded-b-md">
            <div className="flex-1">
                <img 
                    src='/logo.svg'
                    alt="Anime Tracker Logo" 
                    className="w-16" 
                />
            </div>

            <div className="flex-none">
                <ThemeToggle />
            </div>
        </div>
    )
}