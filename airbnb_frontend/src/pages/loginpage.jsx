import { useContext, useState } from "react";
import React from 'react';
import axios from "axios";
import { Link, Navigate } from "react-router-dom"
import { userContext } from "../userContext";

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(userContext)
    async function loginUser(e) {
        e.preventDefault()
        try {
            const userinfo = await axios.post('/login', { email, password }, { withCredentials: true })
            setUser(userinfo.data)
            alert('login succesfull')
            setRedirect(true);
        }
        catch (e) { alert('login failed') }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (<div className="mt-4 grow items-center flex  justify-around flex-col">
        <div className="mb-32">
            <h1 className="text-center leading-loose text-3xl">Login</h1>
            <form action="" className="mx-auto  max-w-sm" onSubmit={loginUser}>
                <input type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com" />
                <input type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="password" />
                <button className="login mt-2" type="submit">Login</button>
                <div className="py-3 text-center">don't have a account yet?
                    <Link to={'/register'}><span className="text-primary">Sign up now</span></Link>
                </div>

            </form>
        </div>
    </div>)
}
export default LoginPage