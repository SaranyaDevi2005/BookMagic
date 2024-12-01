import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IndexPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/places');
                setPlaces(response.data);
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        };
        fetchPlaces();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Available Places</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {places.map((place) => (
                    <div key={place._id} style={{ border: '1px solid #ccc', borderRadius: '10px', width: '300px' }}>
                        <img src={place.imageURL} alt={place.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
                        <div style={{ padding: '10px' }}>
                            <h3>{place.name}</h3>
                            <p>{place.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IndexPage;
