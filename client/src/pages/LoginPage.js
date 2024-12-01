import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUserName } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:4002/login', { email, password });
            if (result.data.status === "Success") {
                setUserName(result.data.name); // Update userName in context
                navigate('/');  // Redirect to /home
            } else {
                console.log(result.data.error); // Display any errors
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto border p-4" onSubmit={handleSubmit}>
                    <input 
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        autoComplete="email"
                        required
                        className="block w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="password" 
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        autoComplete="current-password"
                        required
                        className="block w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <button 
                        type="submit" 
                        className="primary w-full py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
                    >
                        Login
                    </button>
                    <div className="text-center py-2 text-gray-500 mt-4">
                        Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}