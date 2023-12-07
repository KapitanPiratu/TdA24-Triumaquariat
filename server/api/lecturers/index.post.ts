
import { v4 as uuidv4 } from 'uuid';
import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./server/db/records.db');

db.run('PRAGMA foreign_keys = ON;', (err) => console.log(err));

export default defineEventHandler(async (event) => {
    let res;

    await readBody(event)
        .then(body => {

            const id = uuidv4();

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
                    bio,
                    price_per_hour
                )
                VALUES(

                    "${id}",
                    "${body['title_before']}",
                    "${body['first_name']}",
                    "${body['middle_name']}",
                    "${body['last_name']}",
                    "${body['title_after']}",
                    "${body['picture_url']}",
                    "${body['location']}",
                    "${body['claim']}",
                    "${body['bio']}",
                    ${body['price_per_hour']}
                )
            `);

            //TODO using the same uuid is not really the best option but good enough for now
            db.run(`INSERT INTO contact(contact_uuid, lecturer_uuid) VALUES("${id}", "${id}")`);

            body.contact.emails.forEach((email: any) => {
                db.run(`
                    INSERT INTO emails(
                        email,
                        contact_uuid
                    )
                    VALUES(
                        "${email}",
                        "${id}"
                    )
                `);
            });

            res = body;
        })

    return res;
})