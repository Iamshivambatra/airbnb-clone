import { useContext, useState } from "react";
import { userContext } from "../userContext";
import React from 'react';
import { Navigate,  useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./placesPage";
import Accountnav from "./accountNav";
// import { Link } from "react-router-dom";





function Profilepage() {
    const [redirect, setRedirect] = useState(null);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }
    const { ready, user, setUser } = useContext(userContext)

    async function logout(e) {
        await axios.post('/logout');
        setUser(null);
        setRedirect('/')
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    if (!ready) {
        return ('loading ...')
    };

    if (ready && !user && !redirect) {
        return <Navigate to='/login' />
    };

    return (<div>
        <Accountnav></Accountnav>
        {subpage === 'profile' && (<div className="text-center max-w-lg mx-auto">
            logged in as {user.name} ({user.email}) <br />
            <button onClick={logout} className="login max-w-sm mt-4">log out</button>
        </div>)}
        {subpage === 'bookings' && (<div className="text-center max-w-lg mx-auto">
            bookings for  {user.name}
        </div>)}
        {subpage === 'places' && (<div>
           <PlacesPage />
        </div>)}
    </div>)
}

export default Profilepage;