import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [places, setPlaces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4002/user-places')

            .then(response => {
                setPlaces(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the user-places!", error);
            });
    }, []);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            padding: '20px',
            marginTop: '108px'
        },
        content: {
            textAlign: 'center',
            maxWidth: '80%',
            marginBottom: '20px'
        },
        heading: {
            fontSize: '2.5em',
            color: '#333'
        },
        paragraph: {
            fontSize: '1.2em',
            color: '#666',
            lineHeight: '1.5'
        },
        serviceDescription: {
            marginTop: '20px',
            fontStyle: 'italic',
            color: '#444'
        },
        imageBar: {
            width: '100%'
        },
        placesList: {
            marginTop: '20px',
            width: '80%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        placeCard: {
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            margin: '10px',
            width: '300px',
            textAlign: 'center',
            cursor: 'pointer'
        },
        placeImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px'
        },
        placeTitle: {
            fontSize: '1.5em',
            margin: '10px 0',
            color: '#333'
        },
        placeAddress: {
            fontSize: '1em',
            color: '#666',
            marginBottom: '10px'
        }
    };

    const handlePlaceClick = (id) => {
        navigate(`/place/${id}`);
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.heading}>Our Vision</h1>
                <p style={styles.serviceDescription}>
                    At our company, we are passionate about delivering the most aesthetic and luxurious vacation shelters available...
                </p>
            </div>
            <div style={styles.imageBar}>
                {/* ImageScroller component here */}
            </div>
            <div style={styles.placesList}>
                {places.map((place, index) => (
                    <div key={index} style={styles.placeCard} onClick={() => handlePlaceClick(place._id)}>
                        <img src={place.photo} alt={place.title} style={styles.placeImage} />
                        <h3 style={styles.placeTitle}>{place.title}</h3>
                        <p style={styles.placeAddress}>{place.address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
