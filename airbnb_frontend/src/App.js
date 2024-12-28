import React from 'react';
// import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import IndexPage from './pages/indexpage';
import LoginPage from './pages/loginpage';
import Layout from './layout';
import RegisterPage from './pages/registerpage';
// import AccountPage from './pages/account';
// import Profilepage from './pages/account';
import axios from 'axios';
import UserContextProvider from './userContext'
import Profilepage from './pages/account';
import PlacesPage from './pages/placesPage';
import Placepage from './pages/placePage';
import Placesformpage from './pages/placesformpage';
import Bookings from './pages/bookings';

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://airbnb-clone-2-fqnc.onrender.com"
    : "http://localhost:8000";
axios.defaults.withCredentials = true;


function App() {



  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/account' element={<Profilepage/>}/>
        <Route path='/account/places' element={<PlacesPage/>}/>
        <Route path='/account/places/new' element={<Placesformpage/>}/>
        <Route path='/account/places/:_id' element={<Placesformpage/>}/>
        <Route path='/places/:_id' element={<Placepage/>}/>
        <Route path='/account/bookings' element={<Bookings/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
