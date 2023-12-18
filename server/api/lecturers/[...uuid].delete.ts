import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler((event) => {
    const uuid = event.context.params?.uuid;

    db.run(`DELETE FROM lecturers WHERE uuid = "${uuid}"`, (err) => {
        if (!err) {
            setResponseStatus(event, 204);
            return;
        }
    })
})