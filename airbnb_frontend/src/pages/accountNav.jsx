import {Link, useLocation } from "react-router-dom";
import React from 'react';
// import { useContext, useState } from "react";
// import { userContext } from "../userContext";
// import { Navigate,useParams } from "react-router-dom";
// import axios from "axios";
// import PlacesPage from "./placesPage";

function Accountnav(){
    function LinkClasses(type = null) {
        const {pathname} = useLocation();
        let subpage = pathname.split('/')?.[2];
        if(subpage === undefined){
            subpage = 'profile';
        }
        let classes = 'py-2 px-5 bg-gray-300 rounded-full'
        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full';
        }
        return classes;}

return(
    <div><nav className="w-full flex justify-center mt-8 mb-8 gap-4">
    <Link className={LinkClasses('profile')} to={'/account'}>my account</Link>
    <Link className={LinkClasses('bookings')} to={'/account/bookings'}>my bookings</Link>
    <Link className={LinkClasses('places')} to={'/account/places'}>my accomodations</Link>
</nav></div>
)
};

export default Accountnav;