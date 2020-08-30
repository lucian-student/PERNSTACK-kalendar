const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const activityOwner = require('../midelware/activityOwner');
const oneParam = require('../switches/activitys/oneParam');
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
// doesnt work need to fix
router.put('/update_activity/:id', async (req, res) => {
    try {
        const activity_id = req.params.id;
        const data = {
            activity_id,
            ...req.body
        };
        const { type, num_of_params } = req.body;

        switch (parseInt(num_of_params)) {
            case 1:
                const result = oneParam(type, data);
                if (result) {
                    res.json(result);
                } else {
                    res.status(500).send('Update Error');
                }
                //res.json('hello');
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                res.status(500).send('Server Error');
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/delete_activity/:id', [authorization, activityOwner], async (req, res) => {
    try {
        const activity_id = req.params.id;
        const delete_activity =
            await pool.query('DELETE FROM activitys WHERE activity_id=$1 RETURNING actvity_id',
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