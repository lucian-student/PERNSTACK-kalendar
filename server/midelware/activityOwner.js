  const pool = require('../configuration/db');

module.exports = async (req, res, next) => {
    try {
        const id = req.user;
        const activity_id = req.params.id;

        const checkUser =
            await pool.query('SELECT * FROM activitys WHERE activity_id=$1 AND user_id=$2',
                [
                    activity_id,
                    id
                ]);
                if(checkUser.rows.length===0){
                    return res.status(403).json('Not Authorized!');
                }
    } catch (err) {
        console.log(err.message);
        return res.status(403).json('Not Authorized!');
    }
    next();
};