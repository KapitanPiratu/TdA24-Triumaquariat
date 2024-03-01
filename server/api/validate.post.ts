import jwt from 'jsonwebtoken';
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler((event) => {
    const res = new Promise(async (resolve, reject) => {

        await readBody(event)
            .then(body => {
                if (!body.token) {
                    setResponseStatus(event, 400);
                    resolve({ message: 'token not provided' });
                } else {

                    jwt.verify(body.token, 'tempsecret', (err: any, decoded: any) => {
                        if (err) {
                            console.log(err)
                            setResponseStatus(event, 400);
                            resolve({ message: err });
                        } else {
                            db.get(`SELECT uuid FROM lecturers WHERE username="${decoded.username}"`, (err, row: any) => {
                                if (err) {
                                    console.log(err)
                                    setResponseStatus(event, 500);
                                    resolve({ message: err });
                                } else {
                                    resolve({ valid: true, uuid: row.uuid });
                                }
                            })

                        }
                    })
                }
            })
    })
    return res;
});