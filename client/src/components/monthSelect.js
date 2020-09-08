import React, {
    Fragment,
    useEffect,
    useContext
} from 'react';
import MonthCard from './monthCard';
import Dropdown from 'react-bootstrap/Dropdown';
import { CalendarContext } from '../context/calendar';
function MonthSelect({ properties: { year } }) {
    const { months, setMonths, selectedDate, setSelectedDate } = useContext(CalendarContext);
    useEffect(() => {
        const createMonths = (leapDay) => {
            const checkLeapDay = (leapDay) => {
                return leapDay ? 29 : 28;
            }
            const calendar = [
                { name: 'January', days: 31 },
                { name: 'February', days: checkLeapDay(leapDay) },
                { name: 'March', days: 30 },
                { name: 'April', days: 30 },
                { name: 'May', days: 30 },
                { name: 'June', days: 30 },
                { name: 'July', days: 30 },
                { name: 'August', days: 31 },
                { name: 'September', days: 30 },
                { name: 'October', days: 30 },
                { name: 'November', days: 30 },
                { name: 'December', days: 31 }
            ]
            return calendar;
        }
        if (year % 4 === 0) {
            if (year % 100 === 0) {
                if (year % 400 === 0) {
                    setMonths(createMonths(true));
                } else {
                    setMonths(createMonths(false));
                }
            } else {
                setMonths(createMonths(true));
            }
        } else {
            setMonths(createMonths(false));
        }
    }, [year, setMonths])



    return (
        <Fragment>
            {months.length === 12 && (
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {months[selectedDate.month].name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {months.map((month, index) => (
                            <Dropdown.Item key={month.name}
                                onClick={() => { setSelectedDate({ ...selectedDate, month: index }) }}>
                                <MonthCard month={{
                                    ...month,
                                    current_month: (index) === selectedDate.month
                                }} />
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </Fragment>
    )
}

export default MonthSelect;