import React from 'react';
import './Register.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

const Register = (props) => {
    let history = useHistory();
    const handleLogin = () => {
        history.push('/login')
    }
    return (
        <div className='register-contaniner'>
            <div className='container'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 d-none col-sm-7 d-sm-block'>
                        <div className='brand'>
                            Facebook
                        </div>
                        <div className='detail'>
                            hoi dan it helps you connect and share with the people on your
                        </div>
                    </div>
                    <div className='content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
                        <div className='brand d-sm-none'>
                            Facebook
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type='text' className='form-control' placeholder='Email address' />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type='text' className='form-control' placeholder='Phone number address' />
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input type='text' className='form-control' placeholder='Username address' />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type='password' className='form-control' placeholder='Password' />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password:</label>
                            <input type='password' className='form-control' placeholder='Re-enter Password' />
                        </div>
                        <button className='btn btn-primary'>Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already've an accout. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;