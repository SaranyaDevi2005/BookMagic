import React, { useState, useContext } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { UserContext } from '../context/UserContext'; // Adjust the path as necessary

export default function RegisterPage() {
    const { userName, setUserName, userEmail, setUserEmail } = useContext(UserContext);
    const [password, setPassword] = useState('');

    const registerUser = (e) => {
        e.preventDefault();

        axios.post('http://localhost:4002/register', { name: userName, email: userEmail, password })
            .then(result => {
                console.log("Registration result:", result);

                // Ensure the email is correctly passed and not empty
                if (userEmail && userName) {
                    sendConfirmationEmail(userEmail, userName);
                   
                } else {
                    console.error("Email or name is empty. Cannot send email.");
                }
            })
            .catch(err => console.error("Registration error:", err));
    };

    const sendConfirmationEmail = (recipientEmail, recipientName) => {
        emailjs.send('service_76aqv0r', 'template_17dhtwc', {
            to_name: recipientName,
            to_email: recipientEmail,
            message: 'Thank You for Registering with CasaNido. Hope You have a Thrilling experience with us',
        }, 'tLz4P763WdN7upnco')
        .then(
            (result) => {
                console.log("EmailJS result:", result.text);
                console.log("Confirmation message sent");
            },
            (error) => {
                console.error("Email sending error:", error.text);
            }
        );
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={userName} 
                        onChange={ev => setUserName(ev.target.value)}
                        autoComplete="name" 
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="your@email.com" 
                        value={userEmail} 
                        onChange={ev => setUserEmail(ev.target.value)}
                        autoComplete="email" 
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)}
                        autoComplete="current-password" 
                        required
                    />
                    <button className="primary">Register</button>
                </form>
            </div>
        </div>
    );
}
