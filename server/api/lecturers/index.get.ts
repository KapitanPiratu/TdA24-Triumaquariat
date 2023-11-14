import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler((event) => {
    const lecturers = new Promise((resolve, reject) => {
        db.all('SELECT * FROM lecturers', (err, rows) => {
            console.log(`error: ${err}`)
            console.log(rows)
            resolve(rows);
        })
    })

    return lecturers;
})