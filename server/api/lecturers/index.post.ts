import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./server/db/records.db');

db.run('PRAGMA foreign_keys = ON;', (err) => console.log(err));

export default defineEventHandler(async (event) => {
    const res = new Promise(async (resolve, reject) => {

        try {
            await readBody(event)
                .then(body => {

                    const id = uuidv4();
                    body['uuid'] = id;

                    if (
                        !body['first_name'] ||
                        !body['last_name'] ||
                        !body['contact'] ||
                        !Object.keys(body['contact']).includes('emails') ||
                        !Object.keys(body['contact']).includes('telephone_numbers') ||
                        !body['username'] ||
                        !body['password']
                    ) {
                        setResponseStatus(event, 400);
                        resolve({ code: 400, message: 'Bad request' });
                    } else {
                        bcrypt.hash(body['password'], 10, (err: any, hash: any) => {
                            body['password'] = hash;

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
                                    price_per_hour,
                                    username,
                                    password
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
                                    ${body['price_per_hour'] || null},
                                    "${body['username']}",
                                    "${hash}"
                                )
                            `, (err) => {
                                if (err) console.log('lecturer err: ' + err);

                                //TODO using the same uuid is not really the best option but good enough for now
                                db.run(`INSERT INTO contact(contact_uuid, lecturer_uuid) VALUES("${id}", "${id}")`, (err) => {

                                    if (err) {
                                        setResponseStatus(event, 500);
                                        resolve({ code: 500, message: err });
                                    }

                                    if (body.contact.emails) body.contact.emails.forEach((email: any) => {
                                        console.log('doing mails')
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

                                    if (body.contact.telephone_numbers) body.contact.telephone_numbers.forEach((number: any) => {
                                        db.run(`
                                            INSERT INTO telephone_numbers(
                                                number,
                                                contact_uuid
                                            )
                                            VALUES(
                                                "${number}",
                                                "${id}"
                                            )
                                        `);
                                    });

                                    console.log(body.tags);
                                    if (body.tags && !body.tags.length || !Object.keys(body).includes('tags')) {
                                        resolve(body);
                                    } else {
                                        //TODO Cleanup!!!
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
                                                            INSERT INTO lecturers_tags(
                                                                tag_uuid,
                                                                lecturer_uuid
                                                            )
                                                            VALUES(
                                                                "${row.uuid}",
                                                                "${id}"
                                                            )
                                                        `, (err) => {
                                                            console.log(err);
                                                            console.log('res ' + res)
                                                            tag['uuid'] = row.uuid;
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
                                                                INSERT INTO lecturers_tags(
                                                                    tag_uuid,
                                                                    lecturer_uuid
                                                                )
                                                                VALUES(
                                                                    "${taguuid}",
                                                                    "${id}"
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
                                });


                            });
                        })

                    }

                })

        } catch (err) {
            console.log(err);
            setResponseStatus(event, 500);
            resolve({ code: 500, message: err });
        }

    })

    return res;
})