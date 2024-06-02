import axios from "axios";
import React from 'react';
// import { useState } from "react";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Accountnav from "./accountNav";
import { useEffect, useState } from "react";
function PlacesPage() {
    // const { action } = useParams();
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => { setPlaces(data); })
    }, []);
    return (
        <div>
            <Accountnav />
            {
                // action !== 'new' && 
                (
                    <div className="text-center " >
                        <Link to={'/account/places/new'} className=" inline-flex  gap-1 bg-primary text-white rounded-full py-2 px-6"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>add new places
                        </Link></div>)}
            <div className="mt-4 m-2">
                {places.length > 0 && places.map(place =>
                (<Link to={'/account/places/' + place._id} key={place._id} className="bg-gray-200 p-4 gap-3 mt-4 flex rounded-2xl">
                    <div className=" flex w-32 h-32 grow shrink-0 bg-gray-400">
                        {place.photos.length > 0 && (
                            <img className="object-cover" src={'http://localhost:8000/upload/'+place.photos[0]} alt="" />
                        )}
                    </div>
                    <div className="grow-0 shrink">
                        <h2 className="text-xl">{place.title}</h2>
                        <p className="text-sm mt-2">{place.description}</p>
                    </div>
                </Link>)

                )}
            </div>
            {/* {action === 'new' && (
                <Placesformpage/>
            )} */}
        </div>
    )
};

export default PlacesPage;