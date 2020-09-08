import { getAcessToken } from '../utils/accessToken';
import { jwtTransport } from '../axios/refreshTokenAxios';

export const dayQuery = async (date, setActivitys) => {
    return await jwtTransport
        .get(`http://localhost:5000/user_activitys/day`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                date
            }
        })
        .then(res => {
            console.log(res.data);
            setActivitys(res.data);
        })
        .catch(err => console.error(err));
};