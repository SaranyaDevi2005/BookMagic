import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const { userName, setUserName, setUserEmail } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserName(null);
        setUserEmail(null); // Clear the email on logout
        navigate('/login');
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold">You are logged in as {userName}</h1>
                <button 
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
