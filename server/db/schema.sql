CREATE TABLE IF NOT EXISTS lecturers (
    uuid TEXT PRIMARY KEY NOT NULL,
    title_before TEXT,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    title_after TEXT,
    picture_url TEXT,
    location TEXT,
    claim TEXT,
    bio TEXT,
    price_per_hour INTEGER
);

CREATE TABLE IF NOT EXISTS contact (
    contact_uuid TEXT PRIMARY KEY,
    lecturer_uuid TEXT,
    FOREIGN KEY (lecturer_uuid) REFERENCES lecturers(uuid)
);

CREATE TABLE IF NOT EXISTS emails (
    email TEXT,
    contact_uuid TEXT,
    FOREIGN KEY (contact_uuid) REFERENCES contact(contact_uuid)
);