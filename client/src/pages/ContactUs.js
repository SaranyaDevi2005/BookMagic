import React from 'react';
import LocationNavigation from './LocationNavigation'; // Make sure the path is correct

export default function ContactPage() {
    return (
        <div className="container mx-auto p-5 bg-gray-50 min-h-screen mt-28">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-red-500">
                <h1 className="text-3xl font-bold text-center mb-6 text-red-600">Contact Us</h1>
                <p className="text-lg text-gray-600 mb-6 text-center">Feel free to reach out to us at our head office:</p>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-red-600 mb-2">Head Office</h2>
                    <p className="text-gray-600">123 Dream Décor Avenue,</p>
                    <p className="text-gray-600">Coimbatore, Tamil Nadu, India</p>
                    <p className="text-gray-600">Phone: +91-123-456-7890</p>
                    <p className="text-gray-600">Email: <a href="mailto:CasaNido2024@gmail.com" className="text-red-600 hover:underline">CasaNido2024@gmail.com</a></p>
                </div>

                {/* LocationNavigation Component Integration */}
                <LocationNavigation/>

            </div>
        </div>
    );
}
