import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./server/db/records.db');

export default defineEventHandler((event) => {
    const lecturers = new Promise((resolve, reject) => {
        db.all(`
            SELECT
                lecturers.*,
                json_group_array(DISTINCT emails.email) AS emails,
                json_group_array(DISTINCT telephone_numbers.number) AS telephone_numbers
            FROM
                lecturers
            JOIN
                contact ON lecturers.uuid = contact.lecturer_uuid
            LEFT JOIN
                emails ON contact.lecturer_uuid = emails.contact_uuid
            LEFT JOIN
                telephone_numbers ON contact.lecturer_uuid = telephone_numbers.contact_uuid
            GROUP BY lecturers.UUID
        `, (err, rows) => {

            rows.forEach((el: any) => {
                // json_group_array in sqlite returns array in string, this parses it back to json:
                el.emails = JSON.parse(el.emails);
                el.telephone_numbers = JSON.parse(el.telephone_numbers);
            })
            resolve(rows);
        })
    })

    return lecturers;
})