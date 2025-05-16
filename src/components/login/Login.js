import React, { useState } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';



const Login = (props) => {
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const handleCreateNewAccount = () =>{
        history.push('/register')
    }
    const handleLogin = async ()=>{
        setObjValidInput(defaultObjValidInput)
        if(!valueLogin){
            setObjValidInput({...defaultObjValidInput, isValidValueLogin: false});
            toast.error("please enter your email address or phone number");
            return;//return mà kh có giá trị thì nv chỉ để thoát ra khỏi hàm này không chạy xuống dưới nữa
        }
        if(!password){
            setObjValidInput({...defaultObjValidInput, isValidPassword: false});
            toast.error("please enter your password");
            return;
        } 
        let reponse = await loginUser(valueLogin, password);

        if(reponse && reponse.data && +reponse.data.EC === 0){
            //success
            history.push("/users")
        }
        if(reponse && reponse.data && +reponse.data.EC !== 0){
            //error
            toast.error(reponse.data.EM)
        }
    }
    return (
        <div className='login-contaniner'>
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
                        <input type='text' className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control' } placeholder='Email address or phone number' value={valueLogin} onChange={(e)=>{setValueLogin(e.target.value)}}/>
                        <input type='password' className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control' } placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        <button className='btn btn-primary' onClick={()=>{handleLogin()}}>Login</button>
                        <span className='text-center'> <a className='forgot-pass' href='#'>Forgot your password?</a></span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={()=> handleCreateNewAccount()}>
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;