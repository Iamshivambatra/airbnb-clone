import axios from "axios";
import React from 'react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
            setPlaces([...response.data])

        });
    }, []);

    return (
        <div className="mt-8 gap-6 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
            {places.length > 0 && places.map(place => {
                return (<Link to={'/places/'+ place._id}>
                    <div className="rounded-2xl aspect-square h-[240px] bg-slate-600 flex">
                        {place.photos?.[0] && (<img className=" flex items-center rounded-2xl h-[240px]  object-cover aspect-square" src={'http://localhost:8000/upload/' + place.photos?.[0]} alt="img" />)}
                    </div>
                    <h2 className="font-bold text-xs">{place.address}</h2>
                    <h3 className="text-sm text-gray-700">{place.title}</h3>
                    <div className="mt-1"><span className="font-bold text-sm">${place.price}  </span>per night</div>
                </Link>)
            })}
        </div>)
};

export default IndexPage;
