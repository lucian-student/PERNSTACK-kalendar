const pool = require('../configuration/db');

module.exports = async (req, res, next) => {
    try {
        let finalResult = [];
        const createData = req.body.create;
        const updateData = req.body.update;
        if (createData) {
            let x;
            for (x = 0; x < createData.names.length; x++) {
                finalResult.push({
                    start_time: new Date(createData.starts[x]).getTime(),
                    finish_time: new Date(createData.finishes[x]).getTime()
                })
            }
        }
        if (updateData) {
            let x;
            for (x = 0; x < updateData.names.length; x++) {
                finalResult.push({
                    start_time: new Date(updateData.starts[x]).getTime(),
                    finish_time: new Date(updateData.finishes[x]).getTime()
                })
            }
        }

        if ((req.body.deleteIds && (updateData || createData)) || updateData) {
            let ids = [];
            if (updateData) {
                ids = [...updateData.ids];
            }
            if (req.body.deleteIds) {
                ids = [...ids, ...req.body.deleteIds];
            }
            console.log(ids);
            const currentActivitys =
                await pool.query('SELECT start_time,finish_time FROM user_activitys' +
                    ' WHERE activity_date=$1 AND user_activity_id NOT IN (SELECT * FROM unnest($2::bigint[]))',
                    [
                        req.body.date,
                        ids
                    ]);
            finalResult = [
                ...finalResult.map(item => ({
                    start_time: item.start_time,
                    finish_time: item.finish_time
                })),
                ...currentActivitys.rows.map(activity => ({
                    start_time: new Date(activity.start_time).getTime(),
                    finish_time: new Date(activity.finish_time).getTime()
                }))];
        } else {
            const currentActivitys =
                await pool.query('SELECT start_time,finish_time FROM user_activitys' +
                    ' WHERE activity_date=$1',
                    [
                        req.body.date,
                    ]);
            finalResult = [
                ...finalResult.map(item => ({
                    start_time: item.start_time,
                    finish_time: item.finish_time
                })),
                ...currentActivitys.rows.map(activity => ({
                    start_time: new Date(activity.start_time).getTime(),
                    finish_time: new Date(activity.finish_time).getTime()
                }))];
            /* */
        }
        if (!await isOverlap(finalResult)) {
            res.status(400).json('Times Overlap');
        } else {
            next();
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
}
async function isOverlap(results) {
    let i;
    let j;
    const n = results.length;
    for (j = 0; j < n; j++) {
        for (i = j + 1; i < n && j !== i; i++) {
            const first = results[j].start_time;
            const second = results[i].start_time;
            if (first < second) {
                const first2 = results[j].finish_time;
                if (first2 > second) {
                    console.log('1option' + ',' + j + ',' + i);
                    return false;
                }
            } else {
                const second2 = results[i].finish_time;
                if (second2 > first) {
                    console.log('2option');
                    return false;
                }
            }
        }
    }
    return true;
}
/*module.exports = async (req, res, next) => {
    const date = req.body.date;
    const dayliActivities =
        await pool.query('SELECT start_time,finish_time FROM user_activitys' +
            ' WHERE activity_date=$1', [
            date
        ]);
    let newData = [];
    let x;
    for (x = 0; x < req.body.finishes.length; x++) {
        newData.push({
            start_time: new Date(req.body.starts[x]).getTime(),
            finish_time: new Date(req.body.finishes[x]).getTime()
        });
    }
    const results = dayliActivities.rows;
    const finallResult = [...results.map(result => ({
        start_time: new Date(result.start_time).getTime(),
        finish_time: new Date(result.finish_time).getTime()
    })), ...newData];
    try {
        if (!await isOverlap(finallResult)) {
            res.status(400).json('Times Overlap');
        } else {
            next();
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
}
// almost works
async function isOverlap(results) {
    let i;
    let j;
    const n = results.length;
    for (j = 0; j < n; j++) {
        for (i = 0; i < n && j !== i; i++) {
            const first = results[j].start_time;
            const second = results[i].start_time;
            if (first > second) {
                const first2 = results[j].finish_time;
                if (first2 > second) {
                    return false;
                }
            } else {
                if (second2 > first) {
                    console.log(second2 + "," + first);
                    return false;
                }
            }
        }
    }
    return true;
}*/





