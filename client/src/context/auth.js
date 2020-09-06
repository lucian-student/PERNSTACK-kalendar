import React, { useState, useCallback, useContext } from "react";
import { jwtTransport } from '../axios/refreshTokenAxios';
import { getAcessToken, setAccessToken } from '../utils/accessToken';
import { CalendarContext } from './calendar';
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const { setSelectedDate } = useContext(CalendarContext);
    const loginUser = useCallback(async () => {
        return await jwtTransport
            .get('http://localhost:5000/users/me', {
                headers: {
                    'Authorization': 'Bearer ' + getAcessToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                const date = new Date(res.data.current_date);
                setSelectedDate({
                    year: date.getFullYear(),
                    month: date.getMonth()
                });
                setCurrentUser(res.data);
            })
            .catch(err => console.error(err));
    }, [setSelectedDate]);

    async function logout() {
        return await jwtTransport
            .delete('http://localhost:5000/users/logout', {
                headers: {
                    'Authorization': 'Bearer ' + getAcessToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                setAccessToken('');
                setCurrentUser(null);
                console.log(res.data);
            })
            .catch(err => console.error(err));

    }
    return (
        <AuthContext.Provider
            value={{
                currentUser, loginUser, logout
            }}>
            {children}
        </AuthContext.Provider>
    );
};