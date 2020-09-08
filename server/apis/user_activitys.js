const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const overlapCheck = require('../midelware/overlapCheck');
const { createFunction, deleteFunction, updateFunction } = require('../utils/saveFunctions');

router.get('/day', async (req, res) => {
    try {
        const { date } = req.query;

        const day = await pool.query('SELECT * FROM user_activitys WHERE activity_date=$1 ORDER BY start_time asc',
            [
                date
            ]);
        res.json(day.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
router.post('/save', [authorization, overlapCheck], async (req, res) => {
    const client = await pool.connect();
    try {
        // here we will store result of save
        let result = {
            activitys: []
        }
        await client.query('BEGIN');
        //general data
        //delete data
        const deleteIds = req.body.deleteIds;
        if (deleteIds) {
            // extract result
            result = {
                deletes: await deleteFunction(client, deleteIds)
            }
        }
        //query all dayli activities without deleteIds in overlapCheck
        // update data names, descs, starts, finishes, ids
        const updateData = req.body.update;
        if (updateData) {
            // extract result
            result = {
                ...result,
                activitys: await updateFunction(client, updateData)
            }
        }
        // create names,descs,starts,finishes
        if (req.body.create) {
            const date = req.body.date;
            let dates = [];
            let user_ids = [];
            for (i = 0; i < req.body.create.names.length; i++) {
                user_ids.push(req.user);
                dates.push(date);
            }
            const createData = {
                ...req.body.create,
                dates,
                user_ids
            };
            // extract result
            result = {
                ...result,
                activitys: [
                    ...result.activitys,
                    ...await createFunction(client, createData)
                ]
            }
        }
        await client.query('COMMIT');
        res.json(result);
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});


/*router.post('/create_user_activity', overlapCheck, async (req, res) => {
    try {
        // names, descs, starts, finishes , dates
        const names = req.body.names;
        const descs = req.body.descs;
        const start_times = req.body.starts;
        const finish_times = req.body.finishes;
        let dates = [];
        let user_ids = [];
        for (i = 0; i < names.length; i++) {
            user_ids.push(1);
            dates.push(req.body.date);
        }
        const newActivitys =
            await pool.query('INSERT INTO user_activitys' +
                ' (user_id,name,description,start_time,finish_time,activity_date)' +
                ' SELECT * FROM unnest($1::bigint[],$2::text[],$3::text[],$4::timestamp[],$5::timestamp[],$6::date[])' +
                ' RETURNING *',
                [
                    user_ids,
                    names,
                    descs,
                    start_times,
                    finish_times,
                    dates
                ]);
        res.json(newActivitys.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/update_user_activity', authorization, async (req, res) => {
    try {
        // names, descs, starts, finishes, ids
        const data = req.body;
        const updatedActivitys =
            await pool.query(
                'update user_activitys set' +
                ' name=new_values.name,' +
                ' description=new_values.description,' +
                ' start_time=new_values.start_time,' +
                ' finish_time=new_values.finish_time' +
                ' from (SELECT * FROM unnest($1::text[],$2::text[],$3::timestamp[],$4::timestamp[],$5::bigint[]))' +
                ' as new_values(name,description,start_time,finish_time,activity_id)' +
                ' where new_values.activity_id=user_activitys.user_activity_id RETURNING *',
                [
                    data.names,
                    data.descs,
                    data.starts,
                    data.finishes,
                    data.ids
                ]);
        res.json(updatedActivitys.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/delete_user_activity', authorization, async (req, res) => {
    try {
        const ids = req.body.ids;
        const deletedActivitys =
            await pool.query('DELETE FROM user_activitys WHERE user_activity_id' +
                ' IN (SELECT * FROM unnest($1::bigint[])) RETURNING user_activity_id',
                [
                    ids
                ]);
        res.json(deletedActivitys.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
*/
module.exports = router;