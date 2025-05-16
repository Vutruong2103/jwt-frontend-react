//goi api
//viet api ben nay xong roi qua be file api.js viet /login
import axios from "axios"
const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8080/api/v1/register', {
        //truyen obj len server
        email, phone, username, password
    })
}
const loginUser = (valueLogin, password) =>{
    return axios.post('http://localhost:8080/api/v1/login', {
        valueLogin, password
    })
}
export {registerNewUser,loginUser};