const pool = require('../../configuration/db');

module.exports = async (type, value) => {
    const activity_id = value.activity_id;

    let result = null;
    let update_activity = null;
    switch (String(type)) {
        case 'name':
            update_activity =
                await pool.query('UPDATE activitys' +
                    ' SET name=$1' +
                    ' WHERE  activity_id=$2 RETURNING *',
                    [
                        value.name,
                        activity_id
                    ]);
            result = update_activity.rows[0];
            break;
        case 'finish':
            update_activity =
                await pool.query('UPDATE activitys' +
                    ' SET finish_time=$1' +
                    ' WHERE  activity_id=$2 RETURNING *',
                    [
                        value.finish,
                        activity_id
                    ]);
            result = update_activity.rows[0];
            break;
        case 'start':
            update_activity =
                await pool.query('UPDATE activitys' +
                    ' SET start_time=$1' +
                    ' WHERE  activity_id=$2 RETURNING *',
                    [
                        value.start,
                        activity_id
                    ]);
            result = update_activity.rows[0];
            break;
        case 'desc':
            update_activity =
                await pool.query('UPDATE activitys' +
                    ' SET description=$1' +
                    ' WHERE  activity_id=$2 RETURNING *',
                    [
                        value.desc,
                        activity_id
                    ]);
            result = update_activity.rows[0];
            break;
        default:
            console.log('solution not found!');
            result = null;
    }
    return result;
}