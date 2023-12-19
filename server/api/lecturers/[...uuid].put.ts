import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler((event) => {
    const res = new Promise(async (resolve, reject) => {
        await readBody(event)
            .then(body => {

                const uuid = event.context.params?.uuid;

                db.run(`
                    UPDATE lecturers
                    SET
                        title_before = "${body.title_before}",
                        first_name = "${body.first_name}",
                        middle_name = "${body.middle_name}",
                        last_name = "${body.last_name}",
                        title_after = "${body.title_after}",
                        picture_url = "${body.picture_url}",
                        location = "${body.location}",
                        claim = "${body.claim}",
                        bio = "${body.bio}",
                        price_per_hour = "${body.price_per_hour}"
                    WHERE uuid = "${uuid}"
                `, (err => {
                    if (err) {
                        setResponseStatus(event, 500);
                        resolve({ code: 500, message: err });
                    } else {
                        db.run(`SELECT * FROM lecturers_tags WHERE lecturer_uuid = "${body.uuid}"`, (err: any, rows: any) => {
                            if (err) {
                                setResponseStatus(event, 500);
                                resolve({ code: 500, message: err });
                            } else {
                                if (rows) rows.forEach((el: any) => {
                                    console.log(el)
                                    //TODO cases:
                                    //same
                                    //new, already in db
                                    //brand new
                                    //remove
                                })
                                resolve(body)
                            }
                        })
                    }
                }))
            })
    })
    return res;
})