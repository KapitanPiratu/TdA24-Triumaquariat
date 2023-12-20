import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler((event) => {
    const res = new Promise(async (resolve, reject) => {
        await readBody(event)
            .then(body => {

                const uuid = event.context.params?.uuid;

                db.get(`SELECT * FROM lecturers WHERE uuid = "${uuid}"`, (err, row: any) => {
                    if (!row) {
                        setResponseStatus(event, 404);
                        resolve({ code: 404, message: 'User not found' })
                    } else {
                        console.log(body)
                        Object.keys(row).forEach(key => {
                            if (!body.hasOwnProperty(key)) body[key] = row[key];
                        });
                        console.log(body)
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
                                db.all(`
                                SELECT tags.*
                                FROM tags
                                JOIN lecturers_tags ON tags.uuid = lecturers_tags.tag_uuid
                                WHERE lecturers_tags.lecturer_uuid = "${uuid}"
                                `, (err: any, oldTags: any) => {
                                    if (err) {
                                        setResponseStatus(event, 500);
                                        resolve({ code: 500, message: err });
                                    } else {
                                        // disabled for now (maybe forever)
                                        // if (body.tags.length == 0) db.run(`DELETE FROM lecturers_tags WHERE lecturer_uuid = "${body.uuid}"`);

                                        if (oldTags) oldTags.forEach((el: any) => {
                                            //TODO cases:
                                            //same
                                            //new, already in db
                                            //brand new
                                            //remove
                                            if (body.tags && !body.tags.find((newTag: any) => newTag.name == el.name)) {
                                                console.log({ name: el.name })
                                                db.run(`DELETE FROM lecturers_tags WHERE tag_uuid = "${el.uuid}"`);
                                            }
                                        })
                                        resolve(body)
                                    }
                                })
                            }
                        }))
                    }
                })

            })
    })
    return res;
})