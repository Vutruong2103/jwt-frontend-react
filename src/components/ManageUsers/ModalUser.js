import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup, createNewUser, updateCurrentUser } from '../../services/userService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';

//props tu then cha truyen sang
const ModalUser = (props) => {

    const { action, dataModalUser } = props;

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }
    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }
    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getGroups();
    }, [])

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' });
        }
    }, [dataModalUser])

    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id })
            }
        }
    }, [action])

    //Gọi API để lấy danh sách nhóm người dùng trong group, hien thi ten cac group
    const getGroups = async () => {
        let res = await fetchGroup();//gọi hàm fetchGroup() lấy dữ liệu
        if (res && res.EC === 0) {
            setUserGroups(res.DT);//du lieu này sẽ đc hiển thị len the select
            if (res.DT && res.DT.length > 0) {
                let groups = res.DT;
                setUserData({ ...userData, group: groups[0].id })//gan group dau tien lam mac dinh khi hiện
            }
        } else {
            toast.error(res.EM);
        }
    }

    //Cập nhật giá trị từng input trong userData, khi nguoi dung dien vao form
    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);//sao chép toàn bộ object userData
        _userData[name] = value;
        setUserData(_userData);
    }

    //Kiểm tra các input bắt buộc có bị bỏ trống hay không
    const checkValidInpus = () => {
        //create user
        if (action === 'UPDATE') return true;

        setValidInputs(validInputsDefault);//Reset trạng thái hợp lệ

        let arr = ['email', 'phone', 'password', 'group'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);//cho ve gtri ban dau true
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);
                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }

    //Gửi dữ liệu tạo user mới lên server, Xử lý việc tạo người dùng mới khi người dùng nhấn nút "Xác nhận"
    const handleConfirmUser = async () => {
        //create user
        let check = checkValidInpus();
        if (check === true) {//hợp lệ thì gửi lên server de tao moi

            let res = action === 'CREATE' ?
                await createNewUser({ ...userData, groupId: userData['group'] })//đổi group thành groupId vì API backend thường nhận groupId thay vì group
                : await updateCurrentUser({ ...userData, groupId: userData['group'] });

            if (res && res.EC === 0) {
                props.onHide();//ẩn modal đi
                setUserData({ ...defaultUserData, group: userGroups && userGroups.length > 0 ? userGroups[0].id : ''})
            }
            //neu co loi thi hien len
            if (res && res.EC !== 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);//cho ve gtri ban dau true
                _validInputs[res.DT] = false;//Backend trả về DT = "email", sẽ set validInputs.email = false
                setValidInputs(_validInputs);
            }
        }
    }

    //Đóng modal và reset dữ liệu
    const handleCloseUser = () => {
        props.onHide();
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
    }

    return (
        <>
            <Modal size="lg" className='modal-user' show={props.show} onHide={() => handleCloseUser()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === 'CREATE' ? 'Create new user' : 'Edit a user'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email (<span className='red'>*</span>)</label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                type='email'
                                value={userData.email}
                                onChange={(event) => handleOnchangeInput(event.target.value, "email")}></input>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone (<span className='red'>*</span>)</label>
                            <input
                                disabled={action === "CREATE" ? false : true}
                                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.phone}
                                onChange={(event) => handleOnchangeInput(event.target.value, "phone")}></input>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username</label>
                            <input className='form-control' type='text' value={userData.username} onChange={(event) => handleOnchangeInput(event.target.value, "username")}></input>
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            {action === 'CREATE'
                                &&
                                <>
                                    <label>Password (<span className='red'>*</span>)</label>
                                    <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'} type='password' value={userData.password} onChange={(event) => handleOnchangeInput(event.target.value, "password")}></input>
                                </>
                            }
                        </div>

                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address</label>
                            <input className='form-control' type='text' value={userData.address} onChange={(event) => handleOnchangeInput(event.target.value, "address")}></input>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender</label>
                            <select className='form-select' onChange={(event) => handleOnchangeInput(event.target.value, "sex")} value={userData.sex}>
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group (<span className='red'>*</span>)</label>
                            <select
                                className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnchangeInput(event.target.value, "group")}
                                value={userData.group}
                            >
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseUser()}>Close</Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser;