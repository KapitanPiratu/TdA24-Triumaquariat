import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler((event) => {
    const res = new Promise<void>(async (resolve, reject) => {

        const uuid = event.context.params?.uuid;

        db.all(`SELECT * FROM reservations WHERE uuid="${uuid}"`, (err, rows) => {

            if (rows.length == 0) {
                setResponseStatus(event, 404);
                resolve();
            } else {

                db.run(`DELETE FROM reservations WHERE uuid="${uuid}"`, (err) => {
                    if (err) {
                        setResponseStatus(event, 500);
                        console.log(err);
                    } else {
                        setResponseStatus(event, 204);
                    }
                    resolve();
                })

            }

        })

    })
    return res
});