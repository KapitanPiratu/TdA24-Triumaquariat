import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler(async (event) => {
    let res;

    await readBody(event)
        .then(body => {

            db.run(`
                INSERT INTO lecturers(
                    uuid,
                    title_before,
                    first_name,
                    middle_name,
                    last_name,
                    title_after,
                    picture_url,
                    location,
                    claim,
                    bio
                )
                VALUES(
                    "${body['UUID']}",
                    "${body['title_before']}",
                    "${body['first_name']}",
                    "${body['middle_name']}",
                    "${body['last_name']}",
                    "${body['title_after']}",
                    "${body['picture_url']}",
                    "${body['location']}",
                    "${body['claim']}",
                    "${body['bio']}"
                )
            `);

            res = body;
        })

    return res;
})