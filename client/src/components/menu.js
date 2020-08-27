import React, { Fragment, useContext } from 'react';
import { AuthContext } from '../context/auth';
import {Link} from 'react-router-dom';
function Menu(props) {
    const { currentUser, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    return (
        <Fragment>
            <div>
                <Link to='/'>
                    Login
                </Link>
                <Link to='/Register'>
                    Register
                </Link>
            </div>
        </Fragment>
    )
}

export default Menu;