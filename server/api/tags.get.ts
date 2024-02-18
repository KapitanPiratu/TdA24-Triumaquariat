import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler((event) => {
    const res = new Promise(async (resolve, reject) => {

        db.all(`SELECT * FROM tags`, (err, rows) => {
            if (err) {
                console.log(err);
                setResponseStatus(event, 500)
                resolve({ message: err });
            } else {
                resolve(rows);
            }
        })

    })
    return res;
});