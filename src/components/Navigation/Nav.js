import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
const Nav = (props) => {
    const [isShow, setIsShow] = useState(true);
    let location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login') {
            setIsShow(false);
        }
    }, []);
    return (
        <>
            {isShow === true &&
                <div>
                    <div class="topnav">
                        <NavLink to="/" exact>Home</NavLink>
                        <NavLink to="/User">User</NavLink>
                        <NavLink to="/Project">Project</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </div>
                </div>
            }
        </>
    );
}

export default Nav;