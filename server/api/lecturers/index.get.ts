import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler((event) => {
    const lecturers = new Promise((resolve, reject) => {
        db.all(`
            SELECT
                lecturers.*,
                emails.email AS email
            FROM
                lecturers
            JOIN
                contact ON lecturers.uuid = contact.lecturer_uuid
            LEFT JOIN
                emails ON contact.lecturer_uuid = emails.contact_uuid
        `, (err, rows) => {
            console.log(`error: ${err}`)
            console.log(rows)
            resolve(rows);
        })
    })

    return lecturers;
})