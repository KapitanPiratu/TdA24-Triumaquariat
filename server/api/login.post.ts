import jwt from 'jsonwebtoken';
import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./server/db/records.db');
import bcrypt from 'bcrypt';

export default defineEventHandler((event) => {

    const res = new Promise(async (resolve, reject) => {
        await readBody(event)
            .then(body => {
                console.log(body);

                if (!body['username'] || !body['password']) {
                    setResponseStatus(event, 400);
                    resolve({
                        message: 'Body is missing username or password'
                    });
                    return;
                }

                db.get(`SELECT * FROM lecturers WHERE username = "${body['username']}"`, (err: any, row: any) => {
                    if (err) {
                        console.log(err);
                        setResponseStatus(event, 500);
                        resolve({
                            message: err
                        });
                    } else if (!row) {
                        setResponseStatus(event, 404);
                        resolve({
                            message: 'User not found'
                        });
                    } else {

                        bcrypt.compare(body['password'], row['password'], (err, result) => {
                            if (result) {
                                const token = jwt.sign({ username: body['username'] }, 'tempsecret', { expiresIn: '1d' });
                                resolve({ token: token });
                            } else {
                                setResponseStatus(event, 401);
                                resolve({
                                    message: 'Wrong password'
                                });
                            }
                        })
                    }
                })

            })
    })
    return res
});