import React, { Fragment, useContext } from 'react';
import { AuthContext } from '../context/auth';
import MonthDisplay from '../components/monthDisplay';
function Main() {
    const { currentUser } = useContext(AuthContext);
    return (
        <Fragment>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <h3>{new Date(currentUser.current_date).getFullYear()}</h3>
                    <MonthDisplay />
                </div>
            </div>
        </Fragment>
    )
}

export default Main;