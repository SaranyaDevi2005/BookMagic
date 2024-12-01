import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { Country, State } from 'country-state-city';
import logo from './logo.png';

export default function Header() {
    const { userName } = useContext(UserContext);
    const [showNav, setShowNav] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const location = useLocation(); // Get current route
    const navigate = useNavigate(); // Hook for navigation

    const countries = Country.getAllCountries();
    const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];

    // Redirect to homepage if user is logged in
    useEffect(() => {
        if (userName && location.pathname === '/login') {
            navigate('/');
        }
    }, [userName, location.pathname, navigate]);

    return (
        <header className="relative p-4">
            {/* Logo */}
            <div className="absolute top-0 left-0">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-150 h-40" />
                </Link>
            </div>

            {/* Home Page Button */}
            <div className="absolute" style={{ top: '250%', right: '30%', transform: 'translateY(-50%)' }}>
                <Link 
                    to="/" 
                    className={`bg-${location.pathname === '/' ? 'red-500' : 'gray-300'} text-${location.pathname === '/' ? 'white' : 'gray-800'} py-2 px-4 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300`}
                >
                    Home Page
                </Link>
            </div>

            {/* Country-State Selection */}
            <div className="absolute" style={{ top: '250%', left: '40%', transform: 'translate(-50%, -50%)' }}>
                <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-3 shadow-md shadow-gray-300">
                    <select 
                        value={selectedCountry} 
                        onChange={e => {
                            setSelectedCountry(e.target.value);
                            setSelectedState('');
                        }}
                        className="bg-transparent outline-none"
                    >
                        <option value="">Country</option>
                        {countries.map(country => (
                            <option key={country.isoCode} value={country.isoCode}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                    <select 
                        value={selectedState} 
                        onChange={e => setSelectedState(e.target.value)}
                        className="bg-transparent outline-none"
                        disabled={!selectedCountry}
                    >
                        <option value="">State</option>
                        {states.map(state => (
                            <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                    <button className="bg-primary text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Contact Us Button */}
            <div className="absolute" style={{ top: '250%', right: '17%', transform: 'translateY(-50%)' }}>
                <Link to="/contact" className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300">
                    Contact Us
                </Link>
            </div>

            {/* User Menu */}
            <div className="absolute" style={{ top: '250%', right: '3%', transform: 'translateY(-50%)' }}>
                {userName ? (
                    <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 cursor-pointer" onClick={() => setShowNav(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <span className="ml-2">Hello, {userName}</span>
                    </div>
                ) : (
                    <Link to="/login" className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full flex items-center gap-2 hover:bg-red-500 hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <span>Login</span>
                    </Link>
                )}

                {/* Dropdown Navigation */}
                {showNav && (
                    <nav className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <ul className="flex flex-col">
                            <li>
                                <Link className="block px-4 py-2 hover:bg-red-400" to="/account/profile">My Profile</Link>
                            </li>
                            <li>
                                <Link className="block px-4 py-2 hover:bg-red-400" to="/account/bookings">My Bookings</Link>
                            </li>
                            <li>
                                <Link className="block px-4 py-2 hover:bg-red-400" to="/account/places">My Accommodations</Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
