import React, { Fragment, useContext, useEffect } from 'react';
import { activitysQuery } from '../queries/activitysQueries/queryActivites';
import { DayContext } from '../context/dayContext';
import ActivityGrid from '../components/activitysGrid';

function UserAcivitysDisplay() {
    const { page, activitys, setActivitys } = useContext(DayContext);
    useEffect(() => {
        activitysQuery(page, setActivitys);
    }, [page, setActivitys]);
    return (
        <Fragment>
            {activitys.length > 0 && (
                <ActivityGrid activitys={activitys} />
            )}
        </Fragment>
    )
}

export default UserAcivitysDisplay;