const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const activityOwner = require('../midelware/activityOwner');
router.post('/create_activity', authorization, async (req, res) => {
    try {
        const { id, name, description, start_time, finish_time } = req.body;

        const newActivity =
            await pool.query('InserT INTO activitys (user_id,name,description,start_time,finish_time)' +
                ' VALUES ($1,$2,$3,$4,$5) RETURNING *',
                [
                    id,
                    name,
                    description,
                    start_time,
                    finish_time
                ]);

        res.json(newActivity.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
// works
router.put('/update_activity/:id', [authorization, activityOwner], async (req, res) => {
    try {
        const activity_id = req.params.id;
        const data = {
            activity_id,
            ...req.body
        };
        const updateActivity =
            await pool.query('UPDATE activitys' +
                ' SET name=$1, description=$2, start_time=$3, finish_time=$4' +
                ' WHERE actvity_id=$5 RETURNING *',
                [
                    data.name,
                    data.desc,
                    data.start,
                    data.finish,
                    activity_id
                ]);

        res.json(updateActivity.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/delete_activity/:id', async (req, res) => {
    try {
        const activity_id = req.params.id;
        const delete_activity =
            await pool.query('DELETE FROM activitys WHERE activity_id=$1 RETURNING activity_id',
                [
                    activity_id
                ]);
        res.json(delete_activity.rows[0].activity_id)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})



module.exports = router;