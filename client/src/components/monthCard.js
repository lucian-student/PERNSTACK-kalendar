import React, { Fragment } from 'react';

function MonthCard({ month: { name, days, current_month } }) {
    return (
        <Fragment>
            {current_month ? (
                <div style={{ borderBottom: ' 2px solid' }}>
                    {name}
                </div>
            ) : (
                    <Fragment>
                        {name}
                    </Fragment>
                )}
        </Fragment>
    )
}

export default MonthCard;