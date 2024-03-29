CREATE TABLE IF NOT EXISTS lecturers (
    uuid TEXT PRIMARY KEY NOT NULL UNIQUE,
    title_before TEXT,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    title_after TEXT,
    picture_url TEXT,
    location TEXT,
    claim TEXT,
    bio TEXT,
    price_per_hour INTEGER,
    username TEXT,
    password TEXT
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

CREATE TABLE IF NOT EXISTS telephone_numbers (
    number TEXT,
    contact_uuid TEXT,
    FOREIGN KEY (contact_uuid) REFERENCES contact(contact_uuid)
);

CREATE TABLE IF NOT EXISTS tags (
    uuid TEXT PRIMARY KEY,
    name TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS lecturers_tags (
    tag_uuid TEXT,
    lecturer_uuid TEXT,
    PRIMARY KEY (tag_uuid, lecturer_uuid),
    FOREIGN KEY (tag_uuid) REFERENCES tags(uuid) ON DELETE CASCADE,
    FOREIGN KEY (lecturer_uuid) REFERENCES lecturers(uuid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reservations (
    uuid TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    date TEXT,
    time_from TEXT,
    time_to TEXT,
    place TEXT,
    comment TEXT,
    lecturer_uuid TEXT,
    FOREIGN KEY (lecturer_uuid) REFERENCES lecturers (uuid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reservations_tags (
    tag_uuid TEXT,
    reservation_uuid TEXT,
    PRIMARY KEY (tag_uuid, reservation_uuid),
    FOREIGN KEY (tag_uuid) REFERENCES tags (uuid) ON DELETE CASCADE,
    FOREIGN KEY (reservation_uuid) REFERENCES reservations (uuid) ON DELETE CASCADE
);