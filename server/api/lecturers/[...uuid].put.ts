import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler((event) => {
    const res = new Promise(async (resolve, reject) => {
        await readBody(event)
            .then(body => {

                const uuid = event.context.params?.uuid;

                db.run(`
                    UPDATE lectureres
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
                `)
            })
    })
    return res;
})