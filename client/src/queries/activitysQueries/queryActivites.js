import { jwtTransport } from '../../axios/refreshTokenAxios';
import { getAcessToken } from '../../utils/accessToken';


export const activitysQuery = async (page, setActivitys) => {
    return await jwtTransport
        .get(`http://localhost:5000/query_activitys/user_activitys`, {
            headers: {
                'Authorization': 'Bearer ' + getAcessToken(),
                'Content-Type': 'application/json'
            },
            params: {
                page
            }
        })
        .then(res => {
            console.log(res.data);
            setActivitys(res.data);
        })
        .catch(err => console.error(err));
};