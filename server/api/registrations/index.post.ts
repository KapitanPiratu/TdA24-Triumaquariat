import { v4 as uuidv4 } from 'uuid';
import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler((event) => {
    const res = new Promise(async (resolve, reject) => {

        try {
            await readBody(event)
                .then((body) => {

                    const uuid = uuidv4();
                    body.uuid = uuid;

                    db.run(`
                        INSERT INTO registrations (
                            uuid,
                            name,
                            email,
                            date,
                            time_from,
                            time_to,
                            place,
                            comment
                        )
                        VALUES (
                            "${body.uuid}",
                            "${body.name}",
                            "${body.email}",
                            "${body.date}",
                            "${body.timeFrom}",
                            "${body.timeTo}",
                            "${body.place}",
                            "${body.comment}"
                        )
                    `, (err) => {
                        if (err) {
                            console.log(err);
                            setResponseStatus(event, 500);
                            resolve({ code: 500, message: err });
                        } else {


                            console.log(body.tags);
                            if (body.tags && !body.tags.length || !Object.keys(body).includes('tags')) {
                                resolve({ code: 200 });
                            } else {

                                body.tags.forEach((tag: any) => {
                                    db.get(`SELECT * FROM tags WHERE name = "${tag.name}"`, (err, row: any) => {
                                        if (err) {
                                            setResponseStatus(event, 500);
                                            resolve({ code: 500, message: err });
                                        }
                                        if (row) {

                                            //already exists
                                            db.all('SELECT * FROM tags', () => {
                                                db.run(`
                                                    INSERT INTO registrations_tags(
                                                        tag_uuid,
                                                        registration_uuid
                                                    )
                                                    VALUES(
                                                        "${row.uuid}",
                                                        "${uuid}"
                                                    )
                                                `, (err) => {

                                                    if (err) {
                                                        console.log(err);
                                                        console.log('res ' + res)
                                                    }
                                                    resolve(body);

                                                });
                                            })

                                        } else {

                                            //completely new tag
                                            const taguuid = uuidv4();
                                            tag['uuid'] = taguuid;

                                            db.run(`
                                                INSERT INTO tags(
                                                    uuid,
                                                    name
                                                )
                                                VALUES(
                                                    "${taguuid}",
                                                    "${tag.name}"
                                                )
                                            `, (err) => {
                                                if (err) console.log('tags foreach end ' + err);

                                                db.all('SELECT * FROM tags', () => {
                                                    db.run(`
                                                        INSERT INTO registrations_tags(
                                                            tag_uuid,
                                                            registration_uuid
                                                        )
                                                        VALUES(
                                                            "${taguuid}",
                                                            "${uuid}"
                                                        )
                                                    `, (err) => {
                                                        console.log(err);
                                                        console.log('res ' + res)
                                                        resolve(body);
                                                    });
                                                })
                                            });
                                        }
                                    })
                                });
                            }


                        }
                    })

                })
        } catch (err) {
            setResponseStatus(event, 500);
            console.log(err);
            resolve({ code: 500, message: err });
        }

    })
    return res;
});