import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlaceDetail = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4002/user-places/${id}`)
            .then(response => {
                setPlace(response.data);
                setError(null); // Clear any previous error
            })
            .catch(error => {
                console.error("There was an error fetching the place details!", error.response || error.message);
                setError("Failed to fetch place details");
            });
    }, [id]);

    if (error) return <div>{error}</div>; // Display error message
    if (!place) return <div>Loading...</div>;

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: 'auto',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            marginTop: '100px'
        },
        image: {
            width: '100%',
            height: '400px',
            objectFit: 'cover',
            borderRadius: '8px'
        },
        title: {
            fontSize: '2.5em',
            margin: '20px 0',
            color: '#333'
        },
        address: {
            fontSize: '1.2em',
            marginBottom: '20px',
            color: '#666'
        },
        description: {
            fontSize: '1.1em',
            marginBottom: '20px',
            color: '#444'
        },
        bookButton: {
            padding: '10px 20px',
            fontSize: '1.2em',
            color: '#fff',
            backgroundColor: '#ef4444',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'center'
        }
    };

    return (
        <div style={styles.container}>
            <img src={place.photos[0]} alt={place.title} style={styles.image} />
            <h1 style={styles.title}>{place.title}</h1>
            <p style={styles.address}>{place.address}</p>
            <p style={styles.description}>{place.description}</p>
            <button style={styles.bookButton}>Book This Place</button>
        </div>
    );
};

export default PlaceDetail;
