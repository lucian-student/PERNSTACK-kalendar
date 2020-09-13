import React, { createContext, useState } from 'react';

export const DayContext = createContext();
export const DayProvider = ({ children }) => {
    const [day_activitys, setDay_activitys] = useState([]);
    const [activitys, setActivitys] = useState([]);
    const [page, setPage] = useState(0);
    return (
        <DayContext.Provider
            value={{
                day_activitys,
                setDay_activitys,
                activitys,
                setActivitys,
                page,
                setPage
            }}>
            {children}
        </DayContext.Provider>
    );
};