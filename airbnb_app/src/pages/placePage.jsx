import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom"

function Placepage() {
    const { _id } = useParams();
    const [place, setPlace] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [show, showAll] = useState(false);
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [maxguests, setMaxguests] = useState(1);
    useEffect(() => {
        if (!_id) {
            return;
        }
        axios.get('/places/' + _id).then(response => {
            setPlace(response.data);
        })
    }, [_id]);

    if (show) {
        return (
            <div className="absolute inset-0 bg-white min-w-full flex  min-h-screen">
                <div className="p-8 grid gap-4">
                    <button onClick={() => { showAll(false) }} className=" fixed right-12 flex gap-1 py-2 px-4 rounded-xl border border-gray-200 bg-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                        </svg>
                        Close photos
                    </button>

                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <Link to={"http://localhost:8000/upload/" + photo} className="text-center flex items-center ml-48">
                            <img className="object-contain w-[80%]" src={"http://localhost:8000/upload/" + photo} alt="img" />
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    if (!place) {
        return;
    }

    function Book(e) {
        e.preventDefault();
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 bg-gray-100 rounded-2xl mx-12 px-9 py-9">
            <h1 className="text-3xl">{place.title}</h1>
            <a className=" my-2 block font-semibold underline" target="_blank" rel="noreferrer" href={'https://maps.google.com/?q=' + place.address}>{place.address}</a>
            <div className="relative">
                <div className=" grid gap-2 grid-cols-[2fr_1fr]">
                    <div>
                        {place.photos?.[0] && (
                            <div >
                                <img className="aspect-square object-cover" src={"http://localhost:8000/upload/" + place.photos?.[0]} alt="img" />
                            </div>)}
                    </div>
                    <div className="grid  ">

                        {place.photos?.[1] && (<img className="aspect-square object-cover" src={"http://localhost:8000/upload/" + place.photos?.[1]} alt="img" />)}
                        <div className="overflow-hidden">
                            {place.photos?.[2] && (<img className="object-cover aspect-square relative top-2" src={"http://localhost:8000/upload/" + place.photos?.[2]} alt="img" />)}
                        </div>

                    </div>
                </div>
                <button onClick={() => { showAll(true) }} className="absolute flex gap-1 bottom-2 right-2 py-2 px-4 bg-white border rounded-xl  after:shadow-md shadow shadow-gray-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                </svg>
                    show more images</button>
            </div>
            <div className="my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {place.description}
            </div>
            <div className="grid grid-cols-2">
                <div>
                    Check-in: {place.checkin}<br />
                    Check-out: {place.checkout}<br />
                    Max number of guests: {place.maxguests}
                </div>
                <div className="bg-white shadow  p-4 rounded-2xl">
                    <div className="text-xl  items-center text-center">
                      <span className="font-bold">Price: ${place.price}/</span><span className="text-sm font-bold"> per night</span> 
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className="flex">
                            <div className="py-3 px-4">
                                <label>Check in:</label>
                                <input type="date"  value={checkin} onChange={e => setCheckin(e.target.value)}/>
                            </div>
                            <div className="py-3 px-4 border-1">
                                <label>Check out:</label>
                                <input type="date"  value={checkout} onChange={e => setCheckout(e.target.value)} />
                            </div>
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label>Number of guests:</label>
                            <input type="text" value={maxguests}  onChange={e => setMaxguests(e.target.value)}  />
                        </div>
                        <div className="items-center p-3 text-center w-full">
                            <button onClick={(e) => Book(e)} type="button" className="login">Book</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)

}

export default Placepage;