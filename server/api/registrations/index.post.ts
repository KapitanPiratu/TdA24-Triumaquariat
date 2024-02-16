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
                            resolve({ code: 200 });
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