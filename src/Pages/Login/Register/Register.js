import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {

    const navigateLogin = () => {
        navigateLogin('/login');
    }

    const handleRegister = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
    }

    return (
        <div className='register-form'>
            <h2 style={{ textAlign: 'center' }}>Please Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" name='name' placeholder='Your Name' />

                <input type="email" name='email' placeholder='Email Address' required />

                <input type="password" name="password" id="" placeholder='Password' required />
                <input type="submit" value="Register" />
            </form>
            <p>Already have an account? <Link to='/login' className='text-danger pe-auto text-decoration-none' onClick={navigateLogin}>Please login</Link></p>
        </div>
    );
};

export default Register;