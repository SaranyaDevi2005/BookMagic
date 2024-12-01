import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const topMarginContainer = '150px';  // Margin for the grey container
  const topMarginItem = '90px';  // Margin for each accommodation item

  useEffect(() => {
  axios.get('http://localhost:4002/user-places')
    .then(({ data }) => {
      setPlaces(data);
    })
    .catch(error => {
      console.error('Error fetching places:', error);
    });
}, []);


  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <AccountNav />
      <div style={{
        padding: '16px',
        maxWidth: '1200px',
        backgroundColor: '#e5e7eb',  // Grey background for the whole content
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',  // Center the container horizontally
        marginTop: topMarginContainer
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px'
        }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800',color: '#ef4444' }}>My Accommodations</h1>
          <Link style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ef4444',  // Red color for button
            color: '#ffffff',
            padding: '8px 24px',
            borderRadius: '9999px',
            textDecoration: 'none'
          }} to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new place
          </Link>
        </div>
        <div style={{
          backgroundColor: '#ffffff',  // White background for each accommodation item
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginTop: topMarginItem  // Margin between button and content
        }}>
          {places.length > 0 ? (
            places.map(place => (
              <Link key={place._id} to={'/account/places/' + place._id} style={{
                display: 'flex',
                cursor: 'pointer',
                gap: '16px',
                backgroundColor: '#f3f4f6',
                padding: '16px',
                borderRadius: '16px',
                marginBottom: '16px',  // Space between each accommodation item
                textDecoration: 'none',
                transition: 'background-color 0.3s'
              }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#e5e7eb'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}>
                <div style={{
                  flex: '0 0 auto',
                  width: '128px',
                  height: '128px',
                  backgroundColor: '#e5e7eb'
                }}>
                  <PlaceImg place={place} />
                </div>
                <div style={{ flex: '1 1 auto' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '600' }}>{place.title}</h2>
                  <p style={{ fontSize: '14px', marginTop: '8px' }}>{place.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#6b7280' }}>No accommodations found.</p>
          )}
        </div>
      </div>
    </div>
  );
}