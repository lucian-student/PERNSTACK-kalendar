import React, { Fragment, useContext, useEffect, useState } from 'react';
import { CalendarContext } from '../context/calendar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
function MonthDisplay() {
    const { selectedDate, months } = useContext(CalendarContext);
    const [weeks, setWeeks] = useState(null);
    // day 1,2,3,4,5,6,7
    useEffect(() => {
        const starting_day = new Date(`${selectedDate.year}-${selectedDate.month + 1}-01`).getDay();
        let num_of_days = months[selectedDate.month].days;
        let current_day = 1;
        let count = 0;
        let temp_weeks = [];
        while (current_day <= num_of_days) {
            temp_weeks.push({ week: [0, 0, 0, 0, 0, 0, 0] });
            if (count === 0) {
                for (let x = starting_day; x < 7; x++) {
                    temp_weeks[count].week[x] = current_day;
                    current_day++;
                    if (current_day > num_of_days) {
                        break;
                    }
                }
            } else {
                for (let x = 0; x < 7; x++) {
                    temp_weeks[count].week[x] = current_day;
                    current_day++;
                    if (current_day > num_of_days) {
                        break;
                    }
                }
            }
            count++;
        }
        setWeeks(temp_weeks);
    }, [selectedDate, months]);
    return (
        <Fragment>
            <Container>
                <Row style={{ borderBottom: ' 2px solid' }}>
                    <Col >Sunday</Col>
                    <Col  >Monday</Col>
                    <Col >Tuesday</Col>
                    <Col >Wednesday</Col>
                    <Col >Thursday</Col>
                    <Col >Friday</Col>
                    <Col >Saturday</Col>
                </Row>
                {weeks && (
                    <Fragment>
                        {weeks.map((week, index) => (
                            <Row key={index} style={{ borderBottom: ' 2px solid' }}>
                                {week.week.map((day, index) => (
                                    <Col key={index} style={{ borderLeft: ' 2px solid', borderRight: ' 2px solid' }}>
                                        {day !== 0 && (
                                            <Link to={`/Day/${selectedDate.year + '-' + (selectedDate.month + 1) + '-' + day}`}
                                                className='dayLink'>
                                                <p className='calendarCell'>{day}</p>
                                            </Link>
                                        )}
                                    </Col>
                                ))}
                            </Row>
                        ))}
                    </Fragment>
                )}
            </Container>
        </Fragment>
    )
}

export default MonthDisplay;