import React, { Fragment, useEffect, useState } from 'react';
import { dayQuery } from '../queries/dayQuery';
import '../responsivCss/dayPage.css';

function DayPage(props) {
    const date = props.match.params.date;
    const [activitys, setActivitys] = useState([]);

    useEffect(() => {
        dayQuery(String(date), setActivitys);
    }, [date]);
    return (
        <Fragment>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    {date}
                </div>
            </div>
        </Fragment>
    )
}

export default DayPage;