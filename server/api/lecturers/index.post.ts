import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler(async (event) => {
    let res;

    await readBody(event)
        .then(body => {

            console.log(body);

            res = body;
        })

    return res;
})