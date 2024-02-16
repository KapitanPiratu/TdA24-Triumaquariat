import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler((event) => {
    const res = new Promise(async (resolve, reject) => {

        const lecturer_uuid = event.context.params?.uuid;

        db.all(`
            SELECT
                reservations.*,
                json_group_array(DISTINCT json_object('uuid', tags.uuid, 'name', tags.name)) AS tags
            FROM
                reservations
            LEFT JOIN
                reservations_tags ON reservations.uuid = reservations_tags.reservation_uuid
            LEFT JOIN
                tags ON reservations_tags.tag_uuid = tags.uuid
            WHERE
                reservations.lecturer_uuid = "${lecturer_uuid}"
            GROUP BY reservations.uuid
        `, (err, rows) => {

            if (err) {
                console.log(err);
                setResponseStatus(event, 500);
                resolve({ message: err });
            } else if (rows === undefined) {
                setResponseStatus(event, 404);
                resolve({ message: 'lecturer not found' })
            } else {
                resolve(rows);
            }

        })

    })
    return res;
});