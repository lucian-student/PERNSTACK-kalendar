import React, { createContext, useState } from 'react';

export const CalendarContext = createContext();
export const CalendarProvider = ({ children }) => {

    const [selectedDate, setSelectedDate] = useState({
        year: null,
        month: null
    });
    const [months, setMonths] = useState([]);
    return (
        <CalendarContext.Provider
            value={{
                selectedDate,
                setSelectedDate,
                months,
                setMonths
            }}>
            {children}
        </CalendarContext.Provider>
    );
};