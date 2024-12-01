import './App.css';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountNav from './pages/AccountNav';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import AddPlacePage from './pages/AddPlacePage';
import ContactPage from './pages/ContactUs';
import HomePage from './pages/HomePage';
import PlaceDetail from './pages/PlaceDetail';

import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { UserContextProvider } from './context/UserContext';

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="index" element={<IndexPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="place/:id" element={<PlaceDetail />} />

                    <Route path="account" element={<AccountNav />}>
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="places" element={<PlacesPage />} />
                        <Route path="places/new" element={<AddPlacePage />} />
                    </Route>
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
