
import React, { useEffect, useState } from 'react';
import './Users.scss'
import { fetchAllUser, deleteUser } from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

const Users = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);//trang
    const [currentLimit, setCurrentLimit] = useState(2);//gioi han trang
    const [totalPages, setTotalPage] = useState(0);//tong trang
    //modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModel, setDataModel] = useState({});
    //modal update/create
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState('CREATE');
    const [dataModalUser, setDataModalUser] = useState({});

    //do useEffect kh async await được nên tạo hàm mới rồi bỏ hàm đó vào
    useEffect(() => {
        fetchUsers();//cập nhật danh sách người dùng mới
    }, [currentPage])//moi lan thay doi page thi load lai listUser de lay du lieu user tuong ung voi trang hien tai

    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);
        if (response && response.EC === 0) {
            setTotalPage(response.DT.totalPages);//cập nhật lại tổng số trang
            setListUsers(response.DT.users);//cập nhật lại danh sách người dùng của trang hiện tại
        }
    }

    //xuly bam chuyen trang
    const handlePageClick = (event) => {
        //event.selected chỉ số trang bắt đầu từ 0 +1 de len(trang 1, 2, 3...)
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = async (user) => {
        setDataModel(user)
        setIsShowModalDelete(true);
    }

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModel({});
    }


    const confirmDelete = async () => {
        let response = await deleteUser(dataModel);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM)
        }
    }

    const onHideModalUser = async () => {
        setIsShowModalUser(false);
        setDataModalUser({});
        //set lai ds user
        await fetchUsers();
    }

    const handleEditUser = (user) => {
        setActionModalUser('UPDATE');
        setIsShowModalUser(true);
        setDataModalUser(user);
    }

    const handleRefresh = async () => {
        await fetchUsers();
    }
    return (
        <>
            <div className='container'>
                <div className='manage-users-container'>
                    <div className='use-header'>
                        <div className='title mt-3'>
                            <h3>Manage Users</h3>
                        </div>
                        <div className='actions my-3'>
                            <button className='btn btn-success refresh' onClick={() => handleRefresh()}><i className="fa fa-refresh" ></i>Refesh</button>
                            {/* dùng ()=> để hạn chế lỗi kh cần thiết */}
                            <button className='btn btn-primary'
                                onClick={() => { setIsShowModalUser(true); setActionModalUser('CREATE'); }}
                            ><i className="fa fa-plus-circle" ></i>Add new user</button>
                        </div>
                    </div>
                    <div className='user-body'>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                //key giúp React nhận diện từng dòng dữ liệu duy nhất khi render danh sách, bắt buộc khi dùng map
                                                <tr key={`row-${index}`}>
                                                    {/* stt cong vao khi sang trang 2 3... */}
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <span
                                                            title='Edit'
                                                            className='edit'
                                                            onClick={() => { handleEditUser(item) }}><i class="fa fa-pencil"></i></span>
                                                        <span
                                                            title='Delete'
                                                            className='delete'
                                                            onClick={() => handleDeleteUser(item)}><i class="fa fa-trash-o" ></i></span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr><td>Not users</td></tr>
                                    </>}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 0 &&
                        <div className='user-footer'>
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div >
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDelete={confirmDelete}
                dataModel={dataModel}
            />
            <ModalUser
                //title={"Create new user"}
                onHide={onHideModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    );
}

export default Users;