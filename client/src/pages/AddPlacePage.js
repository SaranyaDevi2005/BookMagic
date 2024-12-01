import React, { useState } from "react";
import axios from "axios";

export default function AddPlacePage() {
  const [formData, setFormData] = useState({
    owner:'',
    title: '',
    address: '',
    photos: '',
    description: '',
    perks: '',
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4002/addPlaces', formData);
      console.log('Place added:', response.data);

      // Clear form data or redirect as needed
      setFormData({
        owner:'',
        title: '',
        address: '',
        photos: '',
        description: '',
        perks: '',
        extraInfo: '',
        checkIn: '',
        checkOut: '',
        maxGuests: '',
        price: ''
      });
    } catch (error) {
      console.error('Error adding place:', error);
    }
  };

  return (
    <div className="container mx-auto mt-40 px-4">
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4 text-red-600">Add New Place</h2>
        <div className="h-[58vh] overflow-y-auto"> {/* Set a specific height and enable vertical scrolling */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Photos (comma separated URLs)</label>
              <input type="text" name="photos" value={formData.photos} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Perks (comma separated)</label>
              <input type="text" name="perks" value={formData.perks} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Extra Info</label>
              <textarea name="extraInfo" value={formData.extraInfo} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Check-In Time</label>
              <input type="number" name="checkIn" value={formData.checkIn} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Check-Out Time</label>
              <input type="number" name="checkOut" value={formData.checkOut} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Max Guests</label>
              <input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            </div>
            <button type="submit" className="mt-4 bg-primary text-white py-2 px-4 rounded">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}