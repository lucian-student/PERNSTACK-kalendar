import React, { Fragment, useContext } from 'react';
import { CalendarContext } from '../context/calendar';
import MonthSelect from '../components/monthSelect';
import MonthDisplay from '../components/monthDisplay';
import YearSelect from '../components/yearSelect';
import '../responsivCss/mainCss.css';
function Main() {
    const { selectedDate, months } = useContext(CalendarContext);
    return (
        <Fragment>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <YearSelect />
                    <MonthSelect properties={{
                        year: selectedDate.year,
                        current_month: selectedDate.month
                    }} />
                    {months.length === 12 && (
                        <MonthDisplay />
                    )}
                </div>
            </div>
        </Fragment>
    )
}
export default Main;