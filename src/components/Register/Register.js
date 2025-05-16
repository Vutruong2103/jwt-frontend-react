import React, { useEffect, useState } from 'react';
import './Register.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [defauValidInputm, setDefauValidInput] = useState({
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassWord: true
    })
    const [objCheckInput, setObjCheckInput] = useState({ defauValidInputm });

    let history = useHistory();
    const handleLogin = () => {
        history.push('/login')
    }
    useEffect(() => {

    }, []);

    const isValidInputs = () => {
        setObjCheckInput(defauValidInputm);
        if (!email) {
            toast.error("email is required");
            setObjCheckInput({ ...defauValidInputm, isValidEmail: false });
            return false;
        }
        let reg = /\S+@\S+\.\S+/;
        if (!reg.test(email)) {
            toast.error('please enter a vaild email address')
            setObjCheckInput({ ...defauValidInputm, isValidEmail: false });
            return false;
        }
        if (!phone) {
            toast.error("phone is required");
            setObjCheckInput({ ...defauValidInputm, isValidPhone: false });
            return false;
        }
        if (!password) {
            toast.error("Password is required");
            setObjCheckInput({ ...defauValidInputm, isValidPassword: false });
            return false;
        }
        if (password != confirmPassword) {
            toast.error("your password is not the same");
            setObjCheckInput({ ...defauValidInputm, isValidConfirmPassWord: false });
            return false;
        }

        return true;
    }

    //gui thong tin len server va ktra loi hay khong va hien thi len fe
    const handleRegister = async () => {
        let check = isValidInputs();//all du lieu ok check = true, nguoc lai false
        if (check === true) {
            let response = await registerNewUser(email, phone, username, password);//truyen len server
            let serverData = response.data;//data la cuc data tra ra nhung phan hồi loi phia server
            if (+serverData.EC === 0){
                toast.success(serverData.EM);
                history.push('/login');
            }else{
                toast.error(serverData.EM)
            }
        }

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
                            <input type='text' className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type='text' className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder='Phone number address' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input type='text' className='form-control' placeholder='Username address' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type='password' className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password:</label>
                            <input type='password' className={objCheckInput.isValidConfirmPassWord ? 'form-control' : 'form-control is-invalid'} placeholder='Re-enter Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <button className='btn btn-primary' type='button' onClick={() => handleRegister()}>Register</button>
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