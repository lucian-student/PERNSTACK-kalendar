import React, { Fragment, useEffect, useContext } from 'react';
import { dayQuery } from '../queries/dayQuery';
import { DayContext } from '../context/dayContext';
import DayColumn from '../components/dayColumn';
function DayActivitysDisplay({ properties: { date } }) {
    const { day_activitys, setDay_activitys } = useContext(DayContext);
    useEffect(() => {
        dayQuery(date, setDay_activitys);
    }, [date, setDay_activitys]);
    return (
        <Fragment>
            <DayColumn properties={{ date, activitys: day_activitys }} />
        </Fragment>
    )
}

export default DayActivitysDisplay;