import React, {
    Fragment,
    useEffect,
    useState
} from 'react';


function MonthDisplay({ year }) {
    const [months, setMonths] = useState([]);
    useEffect(() => {
        const createMonths = (leapDay) => {
            const checkLeapDay = (leapDay) => {
                return leapDay ? 29 : 28;
            }
            const calendar = [
                { name: 'January', days: 30 },
                { name: 'February', days: checkLeapDay(leapDay) },
                { name: 'March', days: 30 },
                { name: 'April', days: 30 },
                { name: 'May', days: 30 },
                { name: 'June', days: 30 },
                { name: 'July', days: 30 },
                { name: 'Aughust', days: 30 },
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
    }, [year])



    return (
        <Fragment>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {months.map(month => (
                    <li key={month.name}>
                        {month.name}
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}

export default MonthDisplay;