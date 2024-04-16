import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "./perks";
import Accountnav from "./accountNav";

function Placesformpage() {
    const { _id } = useParams();
    // console.log({_id});
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedphotos, setAddedphotos] = useState([]);
    const [photolink, setPhotolink] = useState('');
    const [perks, setPerks] = useState([]);
    const [description, setDescription] = useState('');
    const [extrainfo, setExtrainfo] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [maxguests, setMaxguests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    async function addphotosbylink(e) {

        e.preventDefault()
        const { data: filename } = await axios.post('/upload-by-link', { link: photolink });
        setAddedphotos(prev => {
            return [...prev, filename]
        })
        console.log(filename);
        setPhotolink('');
    };

    async function uploadphoto(e) {
        const files = e.target.files;
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            console.log(files.length);
            data.append('photo', files[i]);
        }

        const { data: filename } = await axios.post('/upload', data, {
            Headers: { 'content-type': 'multipart/form-data' }
        })
        setAddedphotos(prev => {
            return [...prev, ...filename]
        })

    };

    function removePhoto(e, filename) {
        e.preventDefault();
        setAddedphotos([...addedphotos.filter(filenames => filenames !== filename)]);
    }

    function favPhoto(e, filename) {
        e.preventDefault();
        const addedphotoswithoutFav = addedphotos.filter(filenames => filenames !== filename);
        const Newfavphoto = [filename, ...addedphotoswithoutFav];
        // console.log(Newfavphoto);
        // console.log(addedphotoswithoutFav)
        setAddedphotos(Newfavphoto);
    }

    useEffect(() => {
        if (!_id) {
            return;

        }
        axios.get('/places/' + _id).then(response => {
            const { data } = response;
            // console.log(data);
            // console.log(data.photos);
            setTitle(data.title);
            setAddress(data.address);
            setAddedphotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtrainfo(data.extrainfo);
            setCheckin(data.checkin);
            setCheckout(data.checkout);
            setMaxguests(data.maxguests);
            setPrice(data.price);

        }
        )
    }, [_id]);
    async function saveplace(e) {
        e.preventDefault();
        // console.log('clickked');
        if (_id) {
            // update
            await axios.put('/places', {
                _id,
                title,
                address,
                perks,
                extrainfo,
                checkin,
                checkout,
                maxguests,
                description,
                addedphotos,
                price
            })
            setRedirect(true);
        }
        else {
            // new
            await axios.post('/places', {
                title,
                address,
                perks,
                extrainfo,
                checkin,
                checkout,
                maxguests,
                description,
                addedphotos,
                price
            })
            setRedirect(true);
        }

    };

    if (redirect) {
        return (<Navigate to={'/account/places'} />)
    };
    return (<div>
        <Accountnav />
        <form onSubmit={saveplace}>
            <h2 className="text-l mt-2">Title</h2>
            <p className="text-sm text-gray-500">dexcription</p>
            <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="title" id="title" />
            <h2 className="text-l mt-2">Address</h2>
            <p className="text-sm text-gray-500">dexcription</p>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address" />
            <h2 className="text-l mt-2">Photos</h2>
            <p className="text-sm text-gray-500">dexcription</p>
            <div className="flex gap-2">
                <input type="text" value={photolink} onChange={e => setPhotolink(e.target.value)} placeholder="Add using a link  ...jpg" id="" />
                <button onClick={addphotosbylink} className="bg-primary text-white rounded-2xl px-5">Add&nbsp;photo</button>
            </div>
            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedphotos.length > 0 && addedphotos.map(link => {
                    return (
                        <Link className="flex relative" to={"http://localhost:8000/upload/" + link}>
                            <img className="rounded-xl w-full object-cover" src={"http://localhost:8000/upload/" + link} alt="" />
                            <button onClick={(e) => removePhoto(e, link)} className="cursor-pointer absolute bottom-2 right-2 bg-gray-600 p-1 bg-opacity-50 rounded-lg text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                            <button onClick={(e) => favPhoto(e, link)} className="cursor-pointer absolute bottom-2 left-2 bg-gray-600 p-1 bg-opacity-50 rounded-lg text-white">
                                {link === addedphotos[0] && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                                </svg>

                                )}
                                {link !== addedphotos[0] && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>)}


                            </button>
                        </Link>)

                })}
                <label className="border bg-transparent items-center  flex justify-center gap-1 rounded-2xl p-6 text-xl text-gray-700">
                    <input type="file" key={addedphotos} multiple className="hidden" onChange={uploadphoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload
                </label>
            </div>
            <h2 className="text-l mt-2">Description</h2>
            <p className="text-sm text-gray-500">dexcription</p>
            <textarea className="border border-gray-300 rounded-2xl" value={description} onChange={e => setDescription(e.target.value)} />
            <Perks selected={perks} onChange={setPerks} />
            <h2 className="text-l mt-2">extra info</h2>
            <p className="text-sm text-gray-500">dexcription</p>
            <textarea value={extrainfo} onChange={e => setExtrainfo(e.target.value)} ></textarea >
            <h2 className="text-l mt-2">checkIn & checkOut</h2>
            <p className="text-sm text-gray-500">dexcription</p>
            <div>
                <h3>check in time</h3>
                <input type="text" value={checkin} onChange={e => setCheckin(e.target.value)} placeholder="14:00" /></div>
            <div>
                <h3>check out time</h3>
                <input type="text" value={checkout} onChange={e => setCheckout(e.target.value)} placeholder="14:00" /></div>
            <div>
                <h3> max guests</h3>
                <input type="text" value={maxguests} onChange={e => setMaxguests(e.target.value)} placeholder="4" /></div>
            <div>
                <h3> price</h3>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="100" /></div>
            <div>
                <button className="login" type="submit">save</button>
            </div>
        </form>
    </div>)
}


export default Placesformpage;