const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
// add pagination 
// get all activitys of certain user sorted by creation date
router.get('/user_activitys', authorization, async (req, res) => {
    try {
        const page = req.query.page * 12
        const activitys =
            await pool.query('SELECT * FROM activitys WHERE user_id=$1' +
                ' ORDER BY creation_time asc OFFSET $2 LIMIT 12',
                [
                    req.user,
                    page
                ]);
        res.json(activitys.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
// filter by name
router.get('/search_by_name', authorization, async (req, res) => {
    try {
        const { page, name } = req.query;
        const activitys =
            await pool.query('SELECT * FROM activitys WHERE user_id=$1 AND name=$2 OFFSET $3 LIMIT 12',
                [
                    req.user,
                    name,
                    page * 12
                ]);
        res.json(activitys.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router;