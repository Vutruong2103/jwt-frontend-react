//goi api
//viet api ben nay xong roi qua be file api.js viet /login
// import axios from "axios"
import axios from "../setup/axios"
const registerNewUser = (email, phone, username, password) => {
    return axios.post('/api/v1/register', {
        //truyen obj len server
        email, phone, username, password
    })
}
const loginUser = (valueLogin, password) => {
    return axios.post('/api/v1/login', {
        valueLogin, password
    })
}

//page và limit truyen sang be, lay tu currentPage, currentLimit
const fetchAllUser = (page, limit) => {
    //user/read lấy ở trong file api be
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
}

//gửi yêu cầu truyền id của người dùng cần xóa
const deleteUser = (user) => {
    return axios.delete('/api/v1/user/delete', { data: { id: user.id } })//axios yêu cầu DELETE muốn gửi body thì phải dùng data:
}

const fetchGroup = () => {
    return axios.get(`/api/v1/group/read`);
}

const createNewUser = (userData) => {
    return axios.post(`/api/v1/user/create`, { ...userData });//cope defaultUserData
}

const updateCurrentUser = (userData) => {
    return axios.put(`/api/v1/user/update`, { ...userData });//cope defaultUserData
}
export { registerNewUser, loginUser, fetchAllUser, deleteUser, fetchGroup, createNewUser, updateCurrentUser };