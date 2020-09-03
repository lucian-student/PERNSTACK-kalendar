// dates, user_ids, names,descs,starts,finishes
module.exports.createFunction = async (client, data) => {
    const newActivitys =
        await client.query('INSERT INTO user_activitys' +
            ' (user_id,name,description,start_time,finish_time,activity_date)' +
            ' SELECT * FROM unnest($1::bigint[],$2::text[],$3::text[],$4::timestamp[],$5::timestamp[],$6::date[])' +
            ' RETURNING *',
            [
                data.user_ids,
                data.names,
                data.descs,
                data.starts,
                data.finishes,
                data.dates
            ]);
    return newActivitys.rows;
};

module.exports.updateFunction = async (client, data) => {
    const updatedActivitys =
        await client.query(
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
    return updatedActivitys.rows;
};

module.exports.deleteFunction = async (client, data) => {
    const deletedActivitys =
        await client.query('DELETE FROM user_activitys WHERE user_activity_id' +
            ' IN (SELECT * FROM unnest($1::bigint[])) RETURNING user_activity_id',
            [
                data
            ]);
    return deletedActivitys.rows;
};