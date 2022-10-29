import React, { useState } from 'react'
import Add from '../img/addAvatar.png'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../firebase'
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
            setLoading(false)
        } catch(err) {
            setErr(true)
        }
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Lama Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='email' />
                    <input type="password" placeholder='password' />
                    {loading && !err &&<span>Please wait a minute. Loading...</span>}
                    <button>Sign in</button>
                    {err && <span className='error-message'>Something went wrong</span>}
                </form>
                <p>You don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </div>
    )
}


export default Login