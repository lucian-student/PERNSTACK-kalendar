import React, { Fragment, useEffect, useState } from 'react';
import { dayQuery } from '../queries/dayQuery';
import DragAndDrop from '../components/dragAndDrop';
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
                    <DragAndDrop properties={{ page: 0, date }} />
                </div>
            </div>
        </Fragment>
    )
}

export default DayPage;