import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    console.log();
    async function registerUser(e) {
        e.preventDefault()
        axios.get('/test')
        try {
            await
                axios.post('/register', {name,email,password},{withCredentials:true})
            alert('registration succesfull,Now you can login');
            setRedirect(true);
        }
        catch (ev) { alert('registration failed! , try again later!')}
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (<div className="mt-4 grow items-center flex  justify-around flex-col">
        <div className="mb-32">
            <h1 className="text-center leading-loose text-3xl">Register Here</h1>
            <form action="" className="mx-auto  max-w-sm" onSubmit={registerUser}>
                <input type="text" name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Fullname" />
                <input type="email" name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com" />
                <input type="password" name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="password" />
                <button className="login mt-2" type="submit">Sign up</button>
                <div className="py-3 text-center">Already have an account?
                    <Link to={'/login'}><span className="text-primary">Sign in now</span></Link>
                </div>
            </form>
        </div>
    </div>)
}
export default RegisterPage