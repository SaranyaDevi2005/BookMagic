AccountNav:
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AccountNav() {
    const { pathname } = useLocation();
    const [showNav, setShowNav] = useState(false);
    
    let subpage = pathname.split('/')?.[2];
    if (subpage === undefined) {
        subpage = 'profile';
    }

    function linkClasses(type = null) {
        let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
        if (type === subpage) {
            classes += ' bg-primary text-white';
        } else {
            classes += ' bg-gray-200';
        }
        return classes;
    }

    return (
        <div>
            {/* Profile Icon Toggle */}
            <div className="flex items-center cursor-pointer" onClick={() => setShowNav(prev => !prev)}>
                
            </div>

            {/* Navigation Links */}
            {showNav && (
                <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                    <Link className={linkClasses('profile')} to={'/account/profile'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        My profile
                    </Link>
                    <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        My bookings
                    </Link>
                    <Link className={linkClasses('places')} to={'/account/places'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                        </svg>
                        My accommodations
                    </Link>
                </nav>
            )}
        </div>
    );
}
----------------------------------------------------------------------------------------------------------------------------
ProfilePage:
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const { userName, setUserName } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserName(null);
        navigate('/login');
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">You are logged in as {userName}</h1>
            <button 
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
                Logout
            </button>
        </div>
    );
}
---------------------------------------------------------------------------------------------------------------------------
App:
(api)
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
-----------------------------------------------------------------------------------------------------------------------------
api
Index:

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RegisterModel = require('./models/Register');
//const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/RegisterUser");

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Return the success message along with the user's name
                    res.json({ status: "Success", name: user.name });
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => res.json(err));
});

app.post('/register', (req, res) => {
    RegisterModel.create(req.body)
    .then(registers => res.json(registers))
    .catch(err => res.json(err));
});

// Define the port as a constant
const PORT = 3012;

// Use the constant port when starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
----------------------------------------------------------------------------------------------------------------------------------
Register:
const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {type:String, unique:true},
  password: String,
});

const RegisterModel = mongoose.model('registers', UserSchema);

module.exports = RegisterModel;
----------------------------------------------------------------------------------------------------------------------------------
package.json
{
  "name": "api",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.8.0",
    "mongoose": "^8.5.3",
    "nodemon": "^3.1.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "start": "nodemon index.js"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
-----------------------------------------------------------------------------------------------------------------------------------
LoginPage:

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
            const result = await axios.post('http://localhost:3012/login', { email, password });
            if (result.data.status === "Success") {
                setUserName(result.data.name); // Update userName in context
                navigate('/account');  // Redirect to /account
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
----------------------------------------------------------------------------------------------------------------------------------------
Layout:
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout(){
    return (
        <div className="p-4 flex flex-col min-h-screen ">
            <Header/>
            <Outlet/>
        </div>
    );
}
-------------------------------------------------------------------------------------------------------------------------------------
index:
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
-------------------------------------------------------------------------------------------------------------------------------------
IndexPage:

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
------------------------------------------------------------------------------------------------------------------------------------------
Header:
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './context/UserContext'; // Ensure correct path
import { Country, State } from 'country-state-city';

export default function Header() {
    const { userName } = useContext(UserContext);
    const [showNav, setShowNav] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const countries = Country.getAllCountries();
    const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];

    return (
        <header className="flex justify-between items-center">
            <Link to="/" className='flex items-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                <span className="font-bold text-xl">airbnb</span>
            </Link>
            <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
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
            <div className="relative">
                {userName ? (
                    <div className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 cursor-pointer" onClick={() => setShowNav(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <span className="ml-2">Hello, {userName}</span>
                    </div>
                ) : (
                    <Link to="/login" className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
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
                                <Link className="block px-4 py-2 hover:bg-gray-100" to="/account/profile">My Profile</Link>
                            </li>
                            <li>
                                <Link className="block px-4 py-2 hover:bg-gray-100" to="/account/bookings">My Bookings</Link>
                            </li>
                            <li>
                                <Link className="block px-4 py-2 hover:bg-gray-100" to="/account/places">My Accommodations</Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
------------------------------------------------------------------------------------------
.gitignore:
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
---------------------------------------------------------------------------------
Place
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;
------------------------------------------------------------------------------------------
package.json client
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.4",
    "react": "^18.0.0",
  "react-dom": "^18.0.0",
    "react-router-dom": "^6.26.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "tailwindcss": "^3.4.10"
  }
}
----------------------------------------------------------------------------------------------------
LocationSelector
import React, { useState } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';

const LocationSelector = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity(null);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cityOptions = selectedState
    ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(
        (city) => ({
          value: city.name,
          label: city.name,
        })
      )
    : [];

  return (
    <div>
      <h2>Select Your Location</h2>
      
      <div>
        <label>Select Country</label>
        <Select
          options={countryOptions}
          value={selectedCountry}
          onChange={handleCountryChange}
          placeholder="Select Country"
        />
      </div>

      <div>
        <label>Select State</label>
        <Select
          options={stateOptions}
          value={selectedState}
          onChange={handleStateChange}
          placeholder="Select State"
          isDisabled={!selectedCountry}
        />
      </div>

      <div>
        <label>Select City</label>
        <Select
          options={cityOptions}
          value={selectedCity}
          onChange={handleCityChange}
          placeholder="Select City"
          isDisabled={!selectedState}
        />
      </div>
    </div>
  );
};

export default LocationSelector;
---------------------------------------------------------------------------------------------------------
App location:
import React from 'react';
import LocationSelector from './LocationSelector';

function App() {
  return (
    <div className="App">
      <h1>Location Selector</h1>
      <LocationSelector />
    </div>
  );
}

export default App;
---------------------------------------------------------------------------------------
App test:
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
--------------------------------------------------------------------------------------------------------
tailwind.config
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:
        '#E5385D',
      },
    },
  },
  plugins: [],
}

--------------------------------------------------------------------------------------------
index.css6
:
@tailwind base;
@tailwind components;
@tailwind utilities;

input[type="text"],input[type="password"],
input[type="email"],input[type="number"],
input[type="tel"],
textarea{
    @apply w-full border my-1 py-2 px-3 rounded-2xl;
}
textarea{
    height: 140px;
}
button{
    @apply bg-gray-300;
}
button.primary{
    background-color:#F5385D;
    @apply bg-primary p-2 w-full text-white rounded-2xl;
}
-----------------------------------------------------------------------------------------------

PlacesPage:
import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center mt-12"> {/* Added mt-8 to create space */}
        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-8"> {/* Adjusted margin top here for content below the button */}
        {places.length > 0 && places.map(place => (
          <Link to={'/account/places/' + place._id} key={place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
              <PlaceImg place={place} />
            </div>
            <div className="grow-0 shrink">
              <h2 className="text-xl">{place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
-------------------------------------------------------------**************************************************----------------------------------index.js api
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RegisterModel = require('./models/Register');
const PlaceModel = require('./models/Place'); // Include the Place model

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the MongoDB database where both RegisterUser and Places collections are stored
mongoose.connect("mongodb://127.0.0.1:27017/RegisterUser", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB database');
}).catch(err => {
    console.error('Failed to connect to MongoDB database', err);
});

// User registration and login routes
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Return the success message along with the user's name
                    res.json({ status: "Success", name: user.name });
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => res.json(err));
});

app.post('/register', (req, res) => {
    RegisterModel.create(req.body)
        .then(registers => res.json(registers))
        .catch(err => res.json(err));
});

// Route to get all places
app.get('/user-places', async (req, res) => {
    try {
        const places = await PlaceModel.find();
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving places' });
    }
});

// Route to create a new place
app.post('/places', async (req, res) => {
    try {
        const place = new PlaceModel(req.body);
        await place.save();
        res.status(201).json(place);
    } catch (err) {
        res.status(400).json({ message: 'Error creating place', error: err.message });
    }
});

// Start the server
const PORT = 3012;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
-----------------------------------------------------------*************************************************-------------------------
PagesPlace.js
import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center mt-12"> {/* Added mt-8 to create space */}
        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-8"> {/* Adjusted margin top here for content below the button */}
        {places.length > 0 && places.map(place => (
          <Link to={'/account/places/' + place._id} key={place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
              <PlaceImg place={place} />
            </div>
            <div className="grow-0 shrink">
              <h2 className="text-xl">{place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
-------------------------------------------------*************************************************
add pages
import React, { useState } from "react";
import axios from "axios";

export default function AddPlacePage() {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3012/places', formData);
      console.log('Place added:', response.data);
      // Clear form data or redirect as needed
      setFormData({
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
    <div className="mt-8 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Add New Place</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Photos (comma separated URLs)</label>
          <input type="text" name="photos" value={formData.photos} onChange={handleChange} className="mt-1 block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Perks (comma separated)</label>
          <input type="text" name="perks" value={formData.perks} onChange={handleChange} className="mt-1 block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Extra Info</label>
          <textarea name="extraInfo" value={formData.extraInfo} onChange={handleChange} className="mt-1 block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Check-In Time</label>
          <input type="number" name="checkIn" value={formData.checkIn} onChange={handleChange} className="mt-1 block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Check-Out Time</label>
          <input type="number" name="checkOut" value={formData.checkOut} onChange={handleChange} className="mt-1 block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Max Guests</label>
          <input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleChange} className="mt-1 block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full" />
        </div>
        <button type="submit" className="mt-4 bg-primary text-white py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
}

